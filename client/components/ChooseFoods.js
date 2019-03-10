import React from 'react'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'
import {addFood} from './../store/selectedFoods'
import {connect} from 'react-redux'
import SelectedFoods from './SelectedFoods'
import {calculatePortions} from './../store/portions'
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  ListGroup,
  Card
} from 'react-bootstrap'

const SearchByFoodName = gql`
  query($name: String!) {
    foodByName(name: $name) {
      food_name
      nf_calories
      nf_total_carbohydrate
      nf_total_fat
      nf_protein
      serving_qty
      serving_unit
    }
  }
`

const SearchFoods = gql`
  query($search: String!) {
    foods(search: $search) {
      food_name
    }
  }
`

class ChooseFoods extends React.Component {
  constructor() {
    super()
    this.state = {
      foods: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCalculate = this.handleCalculate.bind(this)
  }

  async handleChange(evt) {
    const search = evt.target.value
    const result = await this.props.client.query({
      query: SearchFoods,
      variables: {search: search}
    })
    if (search !== '' && result.data.foods) {
      const foods = result.data.foods.map(food => food.food_name)
      this.setState({foods: foods.slice(0, 10)})
    } else {
      this.setState({foods: []})
    }
  }

  async handleAdd(foodName) {
    const result = await this.props.client.query({
      query: SearchByFoodName,
      variables: {name: foodName}
    })
    const food = result.data.foodByName
    this.props.addFood(food)
  }

  handleCalculate() {
    this.props.calculatePortions(
      this.props.selectedFoods,
      this.props.restrictions
    )
  }

  render() {
    const foods = this.state.foods || []
    return (
      <div>
        <h1>Select your food</h1>
        <Row>
          <Col md={4}>
            <Form>
              <Form.Control
                placeholder="Search foods by name..."
                type="text"
                onChange={this.handleChange}
              />
            </Form>
          </Col>
          <Col md={6} />
          <Col>
            <Button variant="success" onClick={() => this.handleCalculate()}>
              Calculate
            </Button>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col md={4}>
              <h2>Options</h2>
              <Card style={{width: '18rem'}}>
                <ListGroup>
                  {foods.map(food => (
                    <ListGroup.Item
                      key={food}
                      style={{display: 'flex', justifyContent: 'space-between'}}
                    >
                      {food}
                      <Button
                        variant="primary"
                        onClick={() => this.handleAdd(food)}
                      >
                        add
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={8}>
              <SelectedFoods />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    restrictions: state.restrictions,
    selectedFoods: state.foods
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const {history} = ownProps
  return {
    addFood: food => dispatch(addFood(food)),
    calculatePortions: (foods, restrictions) =>
      dispatch(calculatePortions(foods, restrictions, history))
  }
}

const apolloChooseFoods = withApollo(ChooseFoods)

export default connect(mapState, mapDispatch)(apolloChooseFoods)
