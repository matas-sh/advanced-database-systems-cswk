import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { QueryContext } from '../State/QueryState';
import getLocationByString from '../API/getLocationByString';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px 24px',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 12,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function searchForLocation(locationString, dispatch) {
  dispatch({
    type: 'QUERY_LOADING',
    payload: true,
  });

  getLocationByString(locationString)
    .then((data) => {
      dispatch({
        type: 'SET_QUERY_VALUES',
        payload: { position: data.origin.displayLatLng },
      });
    })
    .catch((e) => {
      dispatch({
        type: 'QUERY_COMPLETED',
        payload: e,
      });
    });
}


export default function SearchBar() {
  const classes = useStyles();
  const { qDispatch } = useContext(QueryContext);
  const [fieldValue, setFieldValue] = useState('');

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for address or postcode"
        inputProps={{ 'aria-label': 'search for address or post code' }}
        onChange={(e) => setFieldValue(e.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={() => searchForLocation(fieldValue, qDispatch)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
