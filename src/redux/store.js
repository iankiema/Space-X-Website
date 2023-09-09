/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rocketsReducer from './Rockets/rocketsSlice';
import missionsReducer from './Missions/missionsSlice';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    rockets: rocketsReducer,
  },
  middleware: [thunk],
});

export default store;
