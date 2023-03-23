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
		<div>
      <strong>ID:</strong> {webhookData.id}<br />
      <strong>Name:</strong> {webhookData.name}<br />
      <strong>Timestamp:</strong> {webhookData.timestamp}<br />
      <strong>Event Type:</strong> {webhookData.eventType}<br />
      <strong>Payload:</strong>
      <pre>{JSON.stringify(webhookData.payload, null, 2)}</pre>
    </div>
  );
};

export default WebhookEvent;
