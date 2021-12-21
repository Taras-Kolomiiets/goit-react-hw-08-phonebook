import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
}));

export default function ContactItem({ contact, onDelete, onEdit }: any) {
  const c = useStyles();

  return (
    <>
      <Grid item component="li" xs={12} sm={6} md={4}>
        <Card className={c.card}>
          <CardContent className={c.cardContent}>
            <Typography variant="h6">{contact.name}</Typography>
            <Typography variant="body1">{contact.number}</Typography>
          </CardContent>

          <CardActions disableSpacing className={c.cardActions}>
            <IconButton onClick={() => onEdit(contact, contact.id)}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDelete(contact.id)}
              aria-label="Delete contact"
            >
              <DeleteForeverIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
