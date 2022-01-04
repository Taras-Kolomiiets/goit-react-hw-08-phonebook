import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  children,
  redirectTo = '/',
  isLoggedIn,
}: any) {
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
