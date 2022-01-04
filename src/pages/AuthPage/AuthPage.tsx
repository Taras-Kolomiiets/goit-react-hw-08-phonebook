import React from 'react';
import {
  Card,
  CardContent,
  Container,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import { makeStyles } from '@material-ui/core/styles';
import IRegister from 'interfaces/IRegister';
import ILogin from 'interfaces/ILogin';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  cardContent: {
    textAlign: 'center',
  },
}));

interface IAuth {
  isLoading: boolean;
  registerUser: (values: IRegister) => void;
  loginUser: (values: ILogin) => void;
}

export default function AuthPage({
  isLoading,
  registerUser,
  loginUser,
}: IAuth) {
  const routes = ['/login', '/register'];
  const location = useLocation();
  const c = useStyles();

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
          </Container>
        </CardContent>
      </Card>
      {isLoading && <LinearProgress />}
    </Container>
  );
}
