import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 20
  },
}));

export default function Header(): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push('/')}
          >
            <HomeIcon className={classes.title} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dog Pic App
          </Typography>
          <Button onClick={() => history.push('/gallery')} color="inherit">Gallery</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}