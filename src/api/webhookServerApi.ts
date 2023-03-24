import axios from 'axios'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || ''

export async function subscribeToWebhook(eventType: string): Promise<any> {
	const webhookData = {
		eventType,
	}

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}

	const response = await axios.post(
		`${apiBaseUrl}/webhook/subscriptions`,
		webhookData,
		config
	)

	return response.data
}

export async function getSubscribedEventTypes(): Promise<string[]> {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}

	const response = await axios.get(
		`${apiBaseUrl}/webhook/subscriptions`,
		config
	)

	return response.data
}

export async function removeWebhookSubscription(eventType: string): Promise<void> {
  const response = await axios.delete(`${apiBaseUrl}/webhook/subscriptions`, {
    params: {
      eventType,
    },
  });
}

