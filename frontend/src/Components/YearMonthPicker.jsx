import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { QueryContext } from '../State/QueryState';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const dateList = [
  '2020-01', '2019-12', '2019-11',
  '2019-10', '2019-09', '2019-08',
  '2019-07', '2019-06', '2019-05',
  '2019-04', '2019-03', '2019-02',
  '2019-01', '2018-12', '2018-11',
  '2018-10', '2018-09', '2018-08',
  '2018-07', '2018-06', '2018-05',
  '2018-04', '2018-03', '2018-02',
];


function changeDate(dispatch, e) {
  console.log('asdasd: ', e);
  dispatch({ type: 'SET_QUERY_VALUES', payload: { date: e } });
}

export default function YearMonthPicker() {
  const { qDispatch, qState } = useContext(QueryContext);
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel> Date </InputLabel>
      <Select
        labelId="Date picker"
        value={qState.date}
        onChange={(e) => { changeDate(qDispatch, e.target.value); }}
      >
        { dateList.map((date) => (<MenuItem value={date}>{date}</MenuItem>)) }
      </Select>
    </FormControl>
  );
}
