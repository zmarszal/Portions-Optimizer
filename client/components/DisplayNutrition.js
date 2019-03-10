import React from 'react'
import {Button} from 'react-bootstrap'

const DisplayNutriton = ({food, remove}) => {
  return (
    <tr>
      <td>{food.name}</td>
      <td>{food.calories}</td>
      <td>{food.carbs}</td>
      <td>{food.fat}</td>
      <td>{food.protein}</td>
      <td>
        {food.servingSize}/{food.servingUnit}
      </td>
      <td>
        <Button variant="danger" onClick={() => remove(food.name)}>
          Remove
        </Button>
      </td>
    </tr>
  )
}

export default DisplayNutriton
