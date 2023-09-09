import configureMockStore from 'redux-mock-store';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import rocketsReducer, {
  fetchRockets,
  reserveRocket,
  cancelReservation,
} from './rocketsSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('rocketsSlice', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should fetch rockets correctly', async () => {
    const store = mockStore({ rockets: [] });

    axiosMock.onGet('https://api.spacexdata.com/v3/rockets').reply(200, [
      {
        rocket_id: '1',
        rocket_name: 'Falcon 1',
        description: 'Rocket 1',
        flickr_images: ['image_url'],
      },
    ]);

    await store.dispatch(fetchRockets());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchRockets.pending.type);

    await store.dispatch(fetchRockets());
    const resolvedActions = store.getActions();
    expect(resolvedActions[1].type).toBe(fetchRockets.fulfilled.type);
    expect(resolvedActions[1].payload).toEqual([
      {
        id: '1',
        name: 'Falcon 1',
        description: 'Rocket 1',
        image: 'image_url',
      },
    ]);
  });

  it('should handle reserveRocket correctly', () => {
    const initialState = { rockets: [{ id: '1', reserved: false }] };
    const store = mockStore(initialState);

    store.dispatch(reserveRocket('1'));

    const actions = store.getActions();
    expect(actions[0].type).toBe(reserveRocket.type);
    expect(actions[0].payload).toBe('1');

    const newState = rocketsReducer(initialState, actions[0]);
    expect(newState.rockets[0].reserved).toBe(true);
  });

  it('should handle cancelReservation correctly', () => {
    const initialState = { rockets: [{ id: '1', reserved: true }] };
    const store = mockStore(initialState);

    store.dispatch(cancelReservation('1'));

    const actions = store.getActions();
    expect(actions[0].type).toBe(cancelReservation.type);
    expect(actions[0].payload).toBe('1');

    const newState = rocketsReducer(initialState, actions[0]);
    expect(newState.rockets[0].reserved).toBe(false);
  });
});
