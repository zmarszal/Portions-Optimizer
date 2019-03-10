import React from 'react'
import {connect} from 'react-redux'
import DisplayNutrition from './DisplayNutrition'
import {removeFood} from './../store/selectedFoods'
import {Table} from 'react-bootstrap'

class SelectedFoods extends React.Component {
  constructor() {
    super()
    this.removeFood = this.removeFood.bind(this)
  }

  removeFood(foodName) {
    this.props.removeFood(foodName)
  }

  render() {
    return (
      <div>
        <h2>Selected Foods</h2>
        <Table>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Carbohydrates</th>
            <th>Fat</th>
            <th>Protein</th>
            <th>Servings/Serving Size</th>
            <th>Remove</th>
          </tr>
          <tbody>
            {this.props.foods.map(food => (
              <DisplayNutrition
                remove={this.removeFood}
                food={food}
                key={food.name}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    foods: state.foods
  }
}

const mapDispatch = dispatch => {
  return {
    removeFood: name => dispatch(removeFood(name))
  }
}

export default connect(mapState, mapDispatch)(SelectedFoods)
