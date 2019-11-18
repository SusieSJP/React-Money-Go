import React from 'react';
//use the BrowserRouter once to create the new router and use route for every single page
import { Router, Route, Switch } from 'react-router-dom';
import ExpenseDashboaardPage from '../components/ExpenseeDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import CategoryPage from '../components/CategoryPage';
import ChartsPage from '../components/ChartsPage';

export const history = createBrowserHistory();
// with export, now we can use it in any places

const AppRouter = () => (
  // swich from browserRouter to simple router, after we install history
  // now we have the access to the history not only in the component.
  // <BrowserRouter>
  <Router history={history}>
    <Switch>
      <Route path="/" component={LoginPage} exact={true}/>
      <PrivateRoute path="/dashboard" component={ExpenseDashboaardPage}/>
      <PrivateRoute path="/create" component={AddExpensePage}/>
      <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
      <PrivateRoute path="/setting" component={CategoryPage}/>
      <PrivateRoute path="/charts" component={ChartsPage}/>
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
