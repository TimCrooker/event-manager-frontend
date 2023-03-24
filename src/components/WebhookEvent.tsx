import { Card, CardContent, Typography } from "@mui/material"
import React from "react";

export interface WebhookData {
	id: string
	name: string
	timestamp: string
  eventType: string;
  payload: Record<string, any>;
}

interface WebhookEventProps {
  webhookData: WebhookData;
}

const WebhookEvent: React.FC<WebhookEventProps> = ({ webhookData }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          ID: {webhookData.id}
        </Typography>
        <Typography variant="h6" component="h3">
          Name: {webhookData.name}
        </Typography>
        <Typography color="textSecondary">
          Timestamp: {webhookData.timestamp}
        </Typography>
        <Typography color="textSecondary">
          Event Type: {webhookData.eventType}
        </Typography>
        <Typography variant="body2" component="pre">
          Payload:
          <br />
          {JSON.stringify(webhookData.payload, null, 2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WebhookEvent;
