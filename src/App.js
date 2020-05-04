import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QiuzList from './containers/QiuzList/QiuzList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'


class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
    
  }

  render() {
  
    let routes = (
      <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/" exact component={QiuzList} />
            <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
              <Route path="/quiz-creator" component={QuizCreator} />
              <Route path="/quiz/:id" component={Quiz} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={QiuzList} />
              <Redirect to="/" />
        </Switch>
      )
    }

    return (
        <Layout>
          {routes}
          {/* <Quiz/> */}
        </Layout>
    )
    }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))