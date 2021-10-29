import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectIsAuthenticated } from './auth/auth.slice';

const Auth = lazy(() => import('../app/auth/Auth'));
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));

const App = () => {
  let isLoggedIn = useSelector(selectIsAuthenticated);

  // isLoggedIn = true;

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Suspense fallback={<p>Page loading ...</p>}>
            {isLoggedIn ? <Dashboard /> : <Auth />}
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
