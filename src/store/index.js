import React from 'react';
import useGlobalHook from 'use-global-hook';

import actions from '../actions';

const initialState = {
  status: 'INITIAL',
  repo: null,
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
