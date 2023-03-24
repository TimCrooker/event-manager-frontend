import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import WebhookEvent, { WebhookData } from './WebhookEvent';
import { Grid, List, ListItem, Typography } from '@mui/material';

const SOCKET_SERVER_URL = process.env.REACT_APP_API_BASE_URL || '';

const WebhookDisplay: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [webhookDataList, setWebhookDataList] = useState<WebhookData[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on('webhook', (data: WebhookData) => {
      console.log('Received webhook data:', data);
      setWebhookDataList((prevWebhookDataList) => [data, ...prevWebhookDataList]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Webhook Data
      </Typography>
			<Grid container spacing={2}>
        {webhookDataList.reverse().map((webhookData, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <WebhookEvent webhookData={webhookData} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WebhookDisplay;
