import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home.jsx'));
const About = lazy(() => import('./About.jsx'));
const Contact = lazy(() => import('./Contact.jsx'));
const Fallback = lazy(() => import('./404.jsx'));

const routes = [
  {
    path: '/',
    component: Home,
    id: 1,
  },
  {
    path: '/about',
    component: About,
    id: 2,
  },
  {
    path: '/contact',
    component: Contact,
    id: 3,
  },
  {
    component: Fallback,
    id: 4,
  },
];

const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {routes.map((route) => (
        <Route
          exact
          key={route.id}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  </Suspense>
);

export default AppRouter;
