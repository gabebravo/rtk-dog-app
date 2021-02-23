import React, { lazy, Suspense, ReactElement } from 'react'
import { BrowserRouter as RouterWrapper, Switch, Route } from 'react-router-dom';
import './App.css';

const Header = lazy(() => import('../components/Header'));
const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
const Gallery = lazy(() => import('../views/Gallery/Gallery'));
const NoMatch = () => <>'There is nothing to see here'</>;

export default function App(): ReactElement {
  
  return (
    <RouterWrapper>
      <Suspense fallback={<p>...Loading</p>}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Suspense>
    </RouterWrapper>
  );
}
