import { Navigate } from 'react-router-dom';

export default function PublicRoute({
  children,
  isLoggedIn,
  restricted = false,
  redirectTo = '/',
}: any) {
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
}
