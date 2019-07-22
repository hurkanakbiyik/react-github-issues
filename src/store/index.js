import React from 'react';
import useGlobalHook from 'use-global-hook';

import actions from '../actions';

const initialState = {
  status: 'INITIAL',
  repo: null,
  filter: {
    field: 'CREATED_AT',
    direction: 'DESC',
    states: 'OPEN',
    previousAfter: '',
  },
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
