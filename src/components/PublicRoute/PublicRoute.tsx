import { Navigate, Route } from 'react-router-dom';

export default function PublicRoute({
  children,
  isLoggedIn,
  redirectTo = '/',
  restricted = false,
  ...routeProps
}: any) {
  return (
    <Route {...routeProps}>
      {restricted && isLoggedIn ? <Navigate to={redirectTo} /> : children}
    </Route>
  );
}
