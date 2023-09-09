/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
  joinedMissions: [],
  status: 'idle',
  error: null,
};
export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/missions');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const missionIdToJoin = action.payload;
      const missionToJoin = state.missions.find(
        (mission) => mission.mission_id === missionIdToJoin,
      );
      if (missionToJoin) {
        missionToJoin.reserved = true;
        state.joinedMissions.push(missionIdToJoin);
      }
    },
    leaveMission: (state, action) => {
      const missionIdToLeave = action.payload;
      const missionToLeave = state.missions.find(
        (mission) => mission.mission_id === missionIdToLeave,
      );
      if (missionToLeave) {
        missionToLeave.reserved = false;
        state.joinedMissions = state.joinedMissions.filter((id) => id !== missionIdToLeave);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { joinMission, leaveMission } = missionSlice.actions;
export default missionSlice.reducer;
