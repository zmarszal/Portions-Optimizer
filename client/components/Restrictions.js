import React from 'react'
import {changeRestrictions} from '../store/restrictions'
import {connect} from 'react-redux'
import {Form, Col, Row, Button} from 'react-bootstrap'

class Restrictions extends React.Component {
  constructor() {
    super()
    this.state = {
      calories: '',
      caloriesRestriction: '<=',
      fat: '',
      fatRestriction: '<=',
      carbs: '',
      carbsRestriction: '<=',
      protein: '',
      proteinRestriction: '<='
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    this.setState({[name]: value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const calories = Number(this.state.calories)
    const fat = Number(this.state.fat)
    const carbs = Number(this.state.carbs)
    const protein = Number(this.state.protein)
    const restrictions = {
      calories,
      fat,
      carbs,
      protein,
      caloriesRestriction: this.state.caloriesRestriction,
      fatRestriction: this.state.fatRestriction,
      carbsRestriction: this.state.carbsRestriction,
      proteinRestriction: this.state.proteinRestriction
    }

    this.props.changeRestrictions(restrictions)
  }

  render() {
    const nutrition = ['calories', 'fat', 'carbs', 'protein']
    return (
      <div>
        <h1>Welcome,</h1>
        <h2>Please Enter Your Restrictions: </h2>
        <Form onSubmit={this.handleSubmit}>
          <Row style={{fontSize: 20}}>
            <Col column sm={1}>
              <Form.Label>Type</Form.Label>
            </Col>
            <Col column sm={1}>
              <Form.Label>Restriction</Form.Label>
            </Col>
            <Col column sm={1}>
              <Form.Label>Amount</Form.Label>
            </Col>
          </Row>
          {nutrition.map(type => (
            <Form.Group as={Row} key={type}>
              <Col column sm={1}>
                <Form.Label>{type}: </Form.Label>
              </Col>
              <Col column sm={1}>
                <Form.Control
                  as="select"
                  name={`${type}Restriction`}
                  onChange={this.handleChange}
                >
                  >
                  <option>select...</option>
                  <option value="<=">≤</option>
                  <option value=">=">≥</option>
                </Form.Control>
              </Col>
              <Col column sm={4}>
                <Form.Control
                  type="text"
                  name={`${type}`}
                  value={this.state[`${type}`]}
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

const mapDispatch = (dispatch, ownprops) => {
  const {history} = ownprops
  return {
    changeRestrictions: restrictions =>
      dispatch(changeRestrictions(restrictions, history))
  }
}

export default connect(null, mapDispatch)(Restrictions)
