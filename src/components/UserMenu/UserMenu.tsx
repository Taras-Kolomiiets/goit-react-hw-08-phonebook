import { Avatar, IconButton, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    display: 'inline-flex',
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface IUserMenu {
  userName: string | undefined;
  onLogOut: () => void;
}

export default function UserMenu({ userName, onLogOut }: IUserMenu) {
  const c = useStyles();

  return (
    <div className={c.container}>
      <Avatar className={c.avatar} alt={userName} />
      <Typography>{userName}</Typography>
      <IconButton color="inherit" onClick={() => onLogOut()}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
}
