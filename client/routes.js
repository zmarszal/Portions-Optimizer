import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Restrictions,
  ChooseFoods,
  DisplayResults
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Restrictions} />
        <Route path="/choosefoods" component={ChooseFoods} />
        <Route path="/displayresults" component={DisplayResults} />
      </Switch>
    )
  }
}

export default Routes
