import React from 'react'
import { EventForm } from './components/EventForm'
import WebhookDisplay from './components/WebhookDisplay'
import { Container, CssBaseline } from '@mui/material'
import { WebhookForm } from './components/WebhookForm'
import SubscribedEventsBar from './components/SubscribedEventsBar'
import { SubscribedEventsProvider } from './context/SubscribedEventsContext'

const App: React.FC = () => {
	const handleSuccess = (event: any) => {
		console.log('Event created:', event)
	}

	const handleError = (error: Error) => {
		console.error('Error creating event:', error.message)
	}

	const handleWebhookSuccess = (webhook: any) => {
		console.log('Webhook subscribed:', webhook)
	}

	const handleWebhookError = (error: Error) => {
		console.error('Error subscribing to webhook:', error.message)
	}

	return (
		<>
			<SubscribedEventsProvider>
				<CssBaseline />
				<SubscribedEventsBar />
				<Container maxWidth="md">
					<h1>Debugging App</h1>
					<WebhookForm
						onSuccess={handleWebhookSuccess}
						onError={handleWebhookError}
					/>
					<EventForm onSuccess={handleSuccess} onError={handleError} />
					<WebhookDisplay />
				</Container>
			</SubscribedEventsProvider>
		</>
	)
}

export default App
