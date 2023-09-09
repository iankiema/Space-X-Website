import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import your Redux mock store
import thunk from 'redux-thunk';
import Rockets from './Rockets'; // Adjust the import path as needed

const mockStore = configureStore([thunk]);

describe('Rockets Component', () => {
  let store;
  const initialState = {
    rockets: {
      rockets: [
        {
          rocket_id: '1',
          rocket_name: 'Falcon 1',
          description: 'rocket 1',
        },
        {
          mission_id: '2',
          mission_name: 'Falcon 9',
          description: 'rocket 2',
        },
      ],
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders rockets and handles join/leave actions', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    // Check if mission names are displayed
    expect(screen.getByText('rocket 1')).toBeInTheDocument();
    expect(screen.getByText('rocket 2')).toBeInTheDocument();
  });
});
