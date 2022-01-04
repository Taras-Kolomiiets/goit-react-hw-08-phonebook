import { AppBar as MUIAppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import UserMenu from 'components/UserMenu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

export default function AppBar({ isLoggedIn, userName, onLogOut }: any) {
  const c = useStyles();

  return (
    <MUIAppBar position="relative">
      <Toolbar>
        <Typography className={c.title} variant="h4" component="h1">
          Phonebook
        </Typography>
        {isLoggedIn && <UserMenu userName={userName} onLogOut={onLogOut} />}
      </Toolbar>
    </MUIAppBar>
  );
}
