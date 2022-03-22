import React, {useContext, useState} from 'react';
import { Button, TextField, Grid, Typography, Container, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { CopyToClipboard} from 'react-copy-to-clipboard';
import { SocketContext} from '../SocketContext';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Phone from '@mui/icons-material/Phone';
import PhoneDisabled from '@mui/icons-material/PhoneDisabled';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
  },
  gridContainer: {
    width: '100%',
    margin: '20px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '800px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Options = ( { children } ) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Typography gutterBottom variant="h6">Account Info</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
            <CopyToClipboard text={me} className={classes.margin}>
              <Button variant="contained" color="primary" fullWidth startIcon={<AssignmentIcon />} fontSize="large">
                Copy Your ID
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid container className={classes.gridContainer}>
            <Typography gutterBottom variant="h6">Make a call</Typography>
            <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth/>
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" StartIcon={<PhoneDisabled fontSize="large"/>}  fullWidth onClick={leaveCall} className={classes.margin}>
                Hang up
              </Button>
            ) : (
              <Button variant="contained" color="primary" StartIcon={<Phone fontSize="large"/>}  fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                Call
              </Button>
            )}
          </Grid>
        </form>
      </Paper>
      Options
      {children}
    </Container>
  )
}

export default Options