import React, { useState, useEffect, lazy, Suspense, ReactElement } from 'react'
import { BrowserRouter as RouterWrapper, Switch, Route } from 'react-router-dom';
import './App.css';

const Header = lazy(() => import('../components/Header'));
const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
const Gallery = lazy(() => import('../views/Gallery/Gallery'));
const NoMatch = () => <>'There is nothing to see here'</>;

export default function App(): ReactElement {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <RouterWrapper>
      <Suspense fallback={show ? <Header /> : <p></p>}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/use-state-simple">
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
