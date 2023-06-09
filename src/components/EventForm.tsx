import React, { useState } from 'react';
import { createEvent } from '../api/eventManagerApi';
import {
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  Paper,
  Typography,
	Autocomplete,
} from '@mui/material';

interface Props {
  onSuccess: (event: any) => void;
  onError: (error: Error) => void;
}

export const EventForm: React.FC<Props> = ({ onSuccess, onError }) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventPayload, setEventPayload] = useState('');

	const eventTypes = ['exampleEventType'];

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
    <Paper elevation={3} style={{ padding: '1rem', marginBottom: '2rem' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Event Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
					<Autocomplete
              freeSolo
              options={eventTypes}
              value={eventType}
              onChange={(_, newValue) => setEventType(newValue || '')}
							onInputChange={(_, newInputValue) => setEventType(newInputValue)}
              renderInput={(params) => (
                <TextField {...params} label="Event Type" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              style={{ width: '100%', minHeight: '5rem' }}
              placeholder="Event Payload"
              value={eventPayload}
              onChange={(e) => setEventPayload(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
