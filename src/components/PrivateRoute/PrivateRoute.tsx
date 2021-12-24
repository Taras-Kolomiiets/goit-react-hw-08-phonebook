import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({
  children,
  redirectTo = '/',
  ...routeProps
}: any) {
  return (
    <Route {...routeProps}>
      {true ? children : <Navigate to={redirectTo} />}
    </Route>
  );
}
