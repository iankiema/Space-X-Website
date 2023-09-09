import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://api.spacexdata.com/v3/rockets';

const initialState = {
  rockets: [],
  pending: false,
  error: false,
};

export const fetchRockets = createAsyncThunk(
  'rocket/fetchRockets',
  async () => {
    const req = axios.get(URL);
    const { data } = await req;
    const result = data.map((rocket) => ({
      id: rocket.rocket_id,
      name: rocket.rocket_name,
      description: rocket.description,
      image: rocket.flickr_images[0],
    }));
    return result;
  },
);

const rocketsSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const rocketId = action.payload;
      const updatedRockets = state.rockets.map((rocket) => (rocket.id === rocketId
        ? { ...rocket, reserved: true } : rocket));
      state.rockets = updatedRockets;
    },
    cancelReservation: (state, action) => {
      const rocketId = action.payload;
      const updatedRockets = state.rockets.map((rocket) => (rocket.id === rocketId
        ? { ...rocket, reserved: false } : rocket));
      state.rockets = updatedRockets;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, { payload }) => {
      if (state.rockets.length < 1) {
        return {
          ...state,
          rockets: payload,
          pending: false,
          error: false,
        };
      }
      return {
        ...state,
        pending: false,
        error: false,
      };
    });
    builder.addCase(fetchRockets.pending, (state) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchRockets.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
  },
});

export default rocketsSlice.reducer;
export const { reserveRocket, cancelReservation } = rocketsSlice.actions;
