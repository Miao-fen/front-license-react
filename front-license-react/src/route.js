import React from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/login/loginDemo';
import List from './components/list/list';
import License from './components/license/license';
import Qr from './components/qr/qr';

class Routes extends React.Component {
  render() {
    const username = sessionStorage.getItem('username')
    return (
      <HashRouter>
        <Switch>
          <Route path='/' render={() => (<Redirect to='/login' />)} exact />
          <Route path='/login' component={Login} exact />
          <Route path="/list" component={List} exact />
          <Route path="/license" component={License} exact />
          <Route path="/q/:id" component={Qr} exact />
        </Switch>
      </HashRouter>
      // <HashRouter>
      //   <Route path='/' render={()=>(<Redirect to='/login' />)} exact/>
      //   <Route path='/login' exact component={ Login } />
      //   <Route path="/list" render={()=>(username?<List/>:<Redirect to='/login' />)} exact/>
      //   <Route path="/license" render={()=>(username?<License/>:<Redirect to='/login' />)} exact/>
      //   <Route path="/q/:id" exact component={ Qr } />
      // </HashRouter>
    )
  }
}
export default Routes;