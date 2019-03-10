import solver from 'javascript-lp-solver'

const optimizePortions = (foods, restrictions) => {
  let model = []
  const objective = `max: ${formatRestriction(foods, 'servingSize')}`
  const cals = formatRestriction(
    foods,
    'calories',
    restrictions.caloriesRestriction,
    restrictions.calories
  )
  const carbs = formatRestriction(
    foods,
    'carbs',
    restrictions.carbsRestriction,
    restrictions.carbs
  )
  const fats = formatRestriction(
    foods,
    'fat',
    restrictions.fatRestriction,
    restrictions.fat
  )
  const proteins = formatRestriction(
    foods,
    'protein',
    restrictions.proteinRestriction,
    restrictions.protein
  )

  model = [objective, cals, carbs, fats, proteins]

  for (let i = 0; i < foods.length; i++) {
    const foodName = foods[i].name.split(' ').join('_')
    model = [...model, `1 ${foodName} >= 0.5`, `1${foodName} <= 10`]
  }

  model = solver.ReformatLP(model)

  const result = solver.Solve(model)
  return formatReturnArr(foods, result)
}

const formatRestriction = (foods, type, restriction, value) => {
  let slack = foods.reduce((foodStr, food) => {
    const foodName = food.name.split(' ').join('_')
    foodStr += `${food[type]} ${foodName} `
    return foodStr
  }, '')

  if (restriction) slack += `${restriction} ${value}`
  else slack = slack.trim()
  return slack
}

const formatReturnArr = (foods, result) => {
  if (!result.feasible)
    return 'Cannot eat these foods and stay within your restrictions'
  else {
    return foods.map(food => {
      let foodName = food.name.split(' ').join('_')
      const servings = result[foodName] * food.servingSize
      foodName = food.name.split('_').join(' ')
      const units = food.servingUnit
      return {servings, foodName, units}
    })
  }
}

export default optimizePortions
