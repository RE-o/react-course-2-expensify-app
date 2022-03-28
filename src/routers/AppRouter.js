import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';   // react-router v4 is obsolet. Let's focus on concepts
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// We would like to redirect user base on our logic. But we are not inside a router component.
// In order to use history API we install history npm pkg and add manually to
// Router. Then we can use it everywhere is needed
// Use use Router instead of BrowserRouter component
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

// Notes: onAuthStateChanged in app.js makes impossible for a logged in user to
// navigate to the login page "/". But it is not its responsability to make this
// check. We need to explicitly make that route be accessible to the login user


