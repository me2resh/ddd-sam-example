import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Appointment } from '../models/Appointment';
import { fetchAppointments, formatDate } from '../services/appointmentService';
import '../styles/patient-appointments.css';

function Appointments() {
  const [patientId, setPatientId] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleReset = () => {
    setPatientId('');
    setAppointments([]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const fetchedAppointments = await fetchAppointments(patientId);
      setAppointments(fetchedAppointments);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPatientId(event.target.value);
  };

  return (
    <div className="container">
      <h1>Patient Appointments</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patientId">Patient ID:</label>
        <input
          type="text"
          id="patientId"
          value={patientId}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Patient Name</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.status}</td>
                <td>{appointment.subject.name}</td>
                <td>{formatDate(appointment.start)}</td>
                <td>{formatDate(appointment.end)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointments;
