import {
  Card,
  CardContent,
  Container,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
} from '@material-ui/core';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

// import ErrorNotification from './../../components/ErrorNotification/ErrorNotification';
import LoginForm from 'components/LoginForm';
import React from 'react';
import RegisterForm from 'components/RegisterForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  cardContent: {
    textAlign: 'center',
  },
}));

export default function AuthPage({
  error,
  isLoading,
  registerUser,
  loginUser,
}: any) {
  const routes = ['/login', '/register'];
  const location = useLocation();
  const c = useStyles();
  console.log(location.pathname);

  return (
    <Container maxWidth="sm" className={c.root}>
      <Card>
        <Paper square>
          <Tabs value={location.pathname} variant="fullWidth">
            <Tab
              value={routes[0]}
              label="Login"
              component={Link}
              to={routes[0]}
            />
            <Tab
              value={routes[1]}
              label="Register"
              component={Link}
              to={routes[1]}
            />
          </Tabs>
        </Paper>
        <CardContent>
          <Container className={c.cardContent}>
            {location.pathname === '/login' && (
              <LoginForm loginUser={loginUser} />
            )}
            {location.pathname === '/register' && (
              <RegisterForm registerUser={registerUser} />
            )}
            {/* <Routes>
              <Route
                path="/login"
                element={<LoginForm loginUser={loginUser} />}
              />
              <Route
                path="/register"
                element={<RegisterForm registerUser={registerUser} />}
              />
            </Routes> */}
          </Container>
        </CardContent>
      </Card>
      {/* {error && (
        <ErrorNotification message={error} action={authActions.resetError} />
      )} */}
      {isLoading && <LinearProgress />}
    </Container>
  );
}
