import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_EVENT_MANAGER_BASE_URL || '';

export async function createEvent(
  name: string,
  eventType: string,
  payload: string
): Promise<any> {
  const eventData = {
    name,
    eventType,
    payload,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const response = await axios.post(`${apiBaseUrl}/event`, eventData, config);

  return response.data;
}