import optimizePortions from './../../linear_optimizer/optimizer'
const initialState = []

const CALCULATE_PORTIONS = 'CALCULATE_PORTIONS'

export const calculatePortions = (foods, restrictions, history) => {
  const portions = optimizePortions(foods, restrictions)
  history.push('/displayresults')

  return {
    type: CALCULATE_PORTIONS,
    portions
  }
}

const portionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE_PORTIONS:
      return action.portions
    default:
      return state
  }
}

export default portionsReducer
