import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  children,
  redirectTo = '/login',
  isLoggedIn,
}: any) {
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
