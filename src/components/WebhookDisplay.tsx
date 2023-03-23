import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import WebhookEvent, { WebhookData } from "./WebhookEvent"; // Import the WebhookEvent component

const SOCKET_SERVER_URL = process.env.REACT_APP_API_BASE_URL || "";

const WebhookDisplay: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [webhookDataList, setWebhookDataList] = useState<WebhookData[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("webhook", (data: WebhookData) => {
      console.log("Received webhook data:", data);
      setWebhookDataList((prevWebhookDataList) => [...prevWebhookDataList, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Webhook Data:</h2>
      <ul>
        {webhookDataList.map((webhookData, index) => (
          <li key={index}>
            <WebhookEvent webhookData={webhookData} /> {/* Render the WebhookEvent component for each item */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebhookDisplay;
