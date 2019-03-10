import React from 'react'
import {Table, Card, ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux'

class DisplayResults extends React.Component {
  render() {
    const {portions, restrictions} = this.props
    return (
      <div>
        <h2>With your restrictions of:</h2>
        <Card style={{width: '18rem'}}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Calories {restrictions.caloriesRestriction}{' '}
              {restrictions.calories}
            </ListGroup.Item>
            <ListGroup.Item>
              Carbohydrates {restrictions.carbsRestriction} {restrictions.carbs}
            </ListGroup.Item>
            <ListGroup.Item>
              Fats {restrictions.fatRestriction} {restrictions.fat}
            </ListGroup.Item>
            <ListGroup.Item>
              Proteins {restrictions.proteinRestriction} {restrictions.protein}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <h2>You can eat:</h2>
        <h2 />
        {typeof portions === 'string' ? (
          <div>{portions}</div>
        ) : (
          <Table>
            <tr>
              <th>Food</th>
              <th>Servings</th>
              <th>Serving Size</th>
            </tr>
            <tbody>
              {portions.map(food => (
                <tr key={food.foodName}>
                  <td>{food.foodName}</td>
                  <td>{food.servings}</td>
                  <td>{food.units}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    portions: state.portions,
    restrictions: state.restrictions
  }
}

export default connect(mapState, null)(DisplayResults)
