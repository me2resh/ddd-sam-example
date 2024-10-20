import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Appointments from '../../components/PatientAppointments';


describe('Appointments', () => {

  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : (input as Request).url;
      if (url.includes('/patients/valid-id/appointments')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: '1',
                status: 'Scheduled',
                subject: { name: 'John Doe' },
                start: '2023-03-28T15:00:00Z',
                end: '2023-03-28T16:00:00Z',
              },
            ]),
        } as Response);
      }
      return Promise.reject(new Error('Invalid URL'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the Appointments component', () => {
    render(<Appointments />);
    expect(screen.getByText('Patient Appointments')).toBeInTheDocument();
  });

  it('fetches and displays appointments when the submit button is clicked', async () => {
    render(<Appointments />);
    const patientIdInput = screen.getByLabelText('Patient ID:');
    fireEvent.change(patientIdInput, { target: { value: 'valid-id' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
  });
});
