const inititalState = {
  calories: 0,
  caloriesRestriction: '<=',
  fat: 0,
  fatRestriction: '<=',
  carbs: 0,
  carbsRestriction: '<=',
  protein: 0,
  proteinRestriction: '<='
}

const CHANGE_RESTRICTIONS = 'CHANGE_RESTRICTIONS'

export const changeRestrictions = (restrictions, history) => {
  history.push('/choosefoods')
  return {
    type: CHANGE_RESTRICTIONS,
    restrictions
  }
}

const restrictionReducer = (state = inititalState, action) => {
  switch (action.type) {
    case CHANGE_RESTRICTIONS:
      return action.restrictions
    default:
      return state
  }
}

export default restrictionReducer
