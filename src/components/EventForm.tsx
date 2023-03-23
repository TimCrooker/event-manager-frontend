import React, { useState } from 'react';
import { createEvent } from '../api/eventManagerApi';

interface Props {
  onSuccess: (event: any) => void;
  onError: (error: Error) => void;
}

export const EventForm: React.FC<Props> = ({ onSuccess, onError }) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventPayload, setEventPayload] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const event = await createEvent(eventName, eventType, eventPayload);
      onSuccess(event);
    } catch (error: any) {
      onError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Event Type:
        <input
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
      </label>
      <br />
      <label>
        Event Payload:
        <textarea
          value={eventPayload}
          onChange={(e) => setEventPayload(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Event</button>
    </form>
  );
};
