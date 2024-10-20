import { Appointment } from "../models/Appointment";

export const fetchAppointments = async (patientId: string): Promise<Appointment[]> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}/patients/${patientId}/appointments`
      );
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 400) {
        throw new Error('Something bad happened. Please make sure the patient ID is provided.');
      } else if (response.status === 500) {
        throw new Error('An internal server error occurred. Please try again later.');
      } else {
        throw new Error('An unknown error occurred. Please try again.');
      }
    } catch (error) {
      throw new Error('Failed to fetch appointments. Please check your network connection and try again.');
    }
  };
  
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  