import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { QueryContext } from '../State/QueryState';
import queryBuilder from '../API/queryBuilder';

function queryDatabse(dispatch, state) {
  dispatch({ type: 'QUERY_LOADING' });
  queryBuilder(state)
    .then((data) => {
      dispatch({ type: 'QUERY_COMPLETED', payload: data });
    })
    .catch((e) => {
      dispatch({ type: 'QUERY_ERROR', payload: e });
    });
}

export default function ApplyButton() {
  const { qDispatch, qState } = useContext(QueryContext);
  return (
    <Container>
      <Button style={{ width: '100%' }} variant="contained" color="primary" onClick={() => { queryDatabse(qDispatch, qState); }}>
        Apply
      </Button>
    </Container>
  );
}
