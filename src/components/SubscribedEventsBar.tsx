import React, { useEffect } from 'react'
import { AppBar, Toolbar, Typography, Chip } from '@mui/material'
import { getSubscribedEventTypes, removeWebhookSubscription } from '../api/webhookServerApi'
import { useSubscribedEvents } from '../context/SubscribedEventsContext'

const SubscribedEventsBar: React.FC = () => {
	const { subscribedEventTypes, setEventTypes } = useSubscribedEvents()

	useEffect(() => {
		const fetchSubscribedEventTypes = async () => {
			try {
				const eventTypes = await getSubscribedEventTypes()
				setEventTypes(eventTypes)
			} catch (error) {
				console.error('Error fetching subscribed event types:', error)
			}
		}

		// Fetch the initial data
		fetchSubscribedEventTypes()
	}, [])

	const handleDelete = async (eventType: string) => {
    try {
      await removeWebhookSubscription(eventType);
      setEventTypes(subscribedEventTypes.filter((et) => et !== eventType));
    } catch (error) {
      console.error('Error removing webhook subscription:', error);
    }
  };


	return (
		<AppBar position="static" color="default">
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					Subscribed Event Types
				</Typography>
				{subscribedEventTypes.map((eventType, index) => (
					<Chip
						key={index}
						label={eventType}
						onDelete={() => handleDelete(eventType)}
						style={{ marginRight: '0.5rem' }}
					/>
				))}
			</Toolbar>
		</AppBar>
	)
}

export default SubscribedEventsBar
