// missionsSlice.test.js

import missionsReducer, {
  fetchMissions,
  joinMission,
  leaveMission,
} from './missionsSlice'; // Adjust the import path as needed

describe('Missions Redux Slice', () => {
  const initialState = {
    missions: [],
    joinedMissions: [],
    status: 'idle',
    error: null,
  };

  it('should handle fetchMissions.pending', () => {
    const nextState = missionsReducer(initialState, fetchMissions.pending());
    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchMissions.fulfilled', () => {
    const missionsData = [
      {
        mission_id: '1',
        mission_name: 'Thaicom',
        description: 'mission 1',
      },
      {
        mission_id: '2',
        mission_name: 'Telstar',
        description: 'mission 2',
      },
    ];

    const nextState = missionsReducer(initialState, fetchMissions.fulfilled(missionsData));
    expect(nextState.status).toBe('succeeded');
    expect(nextState.missions).toEqual(missionsData);
  });

  it('should handle fetchMissions.rejected', () => {
    const error = { message: 'Failed to fetch missions' };
    const nextState = missionsReducer(initialState, fetchMissions.rejected(error));
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed to fetch missions');
  });

  it('should handle joinMission', () => {
    const initialStateWithMissions = {
      ...initialState,
      missions: [
        {
          mission_id: '1',
          mission_name: 'Thaicom',
          description: 'mission 1',
        },
      ],
    };

    const nextState = missionsReducer(
      initialStateWithMissions,
      joinMission('1'),
    );

    expect(nextState.missions[0].reserved).toBe(true);
    expect(nextState.joinedMissions).toEqual(['1']);
  });

  it('should handle leaveMission', () => {
    const initialStateWithMissions = {
      ...initialState,
      missions: [
        {
          mission_id: '1',
          mission_name: 'Thaicom',
          description: 'mission 1',
        },
      ],
      joinedMissions: ['1'],
    };

    const nextState = missionsReducer(
      initialStateWithMissions,
      leaveMission('1'),
    );

    expect(nextState.missions[0].reserved).toBe(false);
    expect(nextState.joinedMissions).toEqual([]);
  });
});
