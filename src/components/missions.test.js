import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import your Redux mock store
import thunk from 'redux-thunk';
import Missions from './Missions'; // Adjust the import path as needed

const mockStore = configureStore([thunk]);

describe('Missions Component', () => {
  let store;
  const initialState = {
    missions: {
      missions: [
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
      ],
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders missions and handles join/leave actions', async () => {
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    // Check if mission names are displayed
    expect(screen.getByText('Thaicom')).toBeInTheDocument();
    expect(screen.getByText('Telstar')).toBeInTheDocument();
  });
});
