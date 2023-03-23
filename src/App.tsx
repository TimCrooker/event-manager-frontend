import React from 'react';
import { EventForm } from './components/EventForm';
import  WebhookDisplay  from './components/WebhookDisplay'

const App: React.FC = () => {
  const handleSuccess = (event: any) => {
    console.log('Event created:', event);
  };

  const handleError = (error: Error) => {
    console.error('Error creating event:', error.message);
  };

  return (
    <div>
      <h1>Create Event</h1>
      <EventForm onSuccess={handleSuccess} onError={handleError} />
			<WebhookDisplay />
    </div>
  );
};

export default App;
