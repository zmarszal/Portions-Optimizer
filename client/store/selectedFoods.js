const initialState = []

const ADD_FOOD = 'ADD_FOOD'
const REMOVE_FOOD = 'REMOVE_FOOD'

export const addFood = food => {
  const newFood = {
    name: food.food_name,
    calories: food.nf_calories,
    protein: food.nf_protein,
    carbs: food.nf_total_carbohydrate,
    fat: food.nf_total_fat,
    servingSize: food.serving_qty,
    servingUnit: food.serving_unit
  }

  return {
    type: ADD_FOOD,
    food: newFood
  }
}

export const removeFood = name => ({
  type: REMOVE_FOOD,
  name
})

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      return [...state, action.food]
    case REMOVE_FOOD:
      return state.filter(food => food.name !== action.name)
    default:
      return state
  }
}

export default foodReducer
