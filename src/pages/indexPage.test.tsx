import { render, screen } from '@testing-library/react';
import IndexPage from './index';

jest.mock('../utils/spacex', () => ({
  ...jest.requireActual('../utils/spacex'),
  fetchLaunches: jest.fn().mockResolvedValue([
    {
      id: '1',
      name: 'Launch 1',
      date_utc: '2024-05-01',
      cores: [{ core: 'Core 1' }],
      links: { patch: { small: 'https://example.com/patch1.png' } },
      payloads: ['payload1'],
      success: true,
    },
    {
      id: '2',
      name: 'Launch 2',
      date_utc: '2024-05-02',
      cores: [{ core: 'Core 2' }],
      links: { patch: { small: 'https://example.com/patch2.png' } },
      payloads: ['payload2'],
      success: false,
      failures: [{ reason: 'Failure reason' }],
    },
  ]
)}))

describe('IndexPage', () => {

  test('renders launch cards with data', async () => {

    render(<IndexPage />);


    await screen.findByText('Latest SpaceX Launches');

   const launchCards = await screen.findAllByTestId('launch-card')

    expect(launchCards).toHaveLength(2);
  });

  test('displays launch details correctly', async () => {

    render(<IndexPage />);

    
    await screen.findByText('Latest SpaceX Launches');

    await screen.findByText('Launch 1')
    expect(screen.getByText('Launch 1')).toBeInTheDocument();
    expect(screen.getByText('Date: 2024-05-01')).toBeInTheDocument();
    expect(screen.getByText('First Core Serial: Core 1')).toBeInTheDocument();
    expect(screen.getByText('Payload ID: payload1')).toBeInTheDocument();
    expect(screen.getByText('Success: Yes')).toBeInTheDocument();
  });

  test('displays failure reason when launch is unsuccessful', async () => {

    render(<IndexPage />);

    
    await screen.findByText('Latest SpaceX Launches');

    const launchCards = await screen.findAllByTestId('launch-card')

    expect(launchCards).toHaveLength(2);
    
    expect(screen.getByText('Failure Reason: Failure reason')).toBeInTheDocument();
  });

});
