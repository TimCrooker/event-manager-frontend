import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import { subscribeToWebhook } from '../api/webhookServerApi';
import { useSubscribedEvents } from '../context/SubscribedEventsContext'

interface Props {
  onSuccess: (event: any) => void;
  onError: (error: Error) => void;
}

export const WebhookForm: React.FC<Props> = ({ onSuccess, onError }) => {
  const [eventType, setEventType] = useState('');

	const { addEventType } = useSubscribedEvents()

  const eventTypes = ['exampleEventType'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const webhook = await subscribeToWebhook(eventType);
      onSuccess(webhook);
			addEventType(eventType)
    } catch (error: any) {
      onError(error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginBottom: '2rem' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Webhook Subscription
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
            <Button variant="contained" color="primary" type="submit">
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
