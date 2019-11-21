import React from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';
import NoMatch from './NoMatch';
import NavBar from './NavBar';

export default function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => <Component {...props} {...rest} />}
          />
        ))}
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}
