const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { Server } = require('socket.io')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 5000

// Create an HTTP server for Socket.IO
const server = require('http').createServer(app)
const io = new Server(server, {
	cors: {
		origin: process.env.REACT_APP_CLIENT_BASE_URL,
		methods: ['GET', 'POST'],
	},
})

// Forward requests from the client app to the event-manager server
app.use(
	'/api',
	createProxyMiddleware({
		target: process.env.REACT_APP_API_BASE_URL,
		changeOrigin: true,
	})
)

// Set up a route to receive webhook notifications
app.use(express.json())
app.post('/webhook', (req, res) => {
	console.log('Received webhook:', req.body)
	// Forward the webhook data to connected clients using Socket.IO
	const eventData = {
		...req.body
	}

	io.emit('webhook', eventData)
	res.sendStatus(200)
})

// Start the Socket.IO server
async function subscribeToWebhook() {
	try {
		const webhookUrl = `${process.env.REACT_APP_API_BASE_URL}/webhook`
		const eventType ='exampleEventType' // An array of event types to subscribe to

		const response = await axios.post(
			`${process.env.REACT_APP_EVENT_MANAGER_BASE_URL}/event/webhook/subscribe`,
			{
				ownerId: 'test-owner-id-12345',
				webhookUrl,
				eventType,
			}
		)

		console.log('Successfully subscribed to webhook service:', response.data)
	} catch (error) {
		console.error('Failed to subscribe to webhook service:', error.message)
		// Retry after 10 seconds
		setTimeout(subscribeToWebhook, 10000)
	}
}

async function checkEventService() {
	try {
		const response = await axios.get(`${process.env.REACT_APP_EVENT_MANAGER_BASE_URL}`)
		if (response.status === 200) {
			console.log('Event service is up and running')
			console.log("Subscribed to the following webhooks", response.data)
			return
		} else {
			console.error(
				'Event service is not responding with status code:',
				response.status
			)
			return
		}
	} catch (error) {
		console.error('Failed to check event service:', error.message)
		// Retry after 10 seconds
		setTimeout(checkEventService, 10000)
		return
	}
}

// Start the Socket.IO server and subscribe to the webhook service
server.listen(PORT, async () => {
	console.log(`Server listening on port ${PORT}`)

	// Check if the event service is up and running with retry logic
	await checkEventService()

	// Subscribe to the webhook service with retry logic
	await subscribeToWebhook()
})

// Create a cron job to send random WebSocket events every minute
// cron.schedule('*/1 * * * *', () => {
// 	console.log('Sending random WebSocket event')

// 	const randomPayload = {
// 		timestamp: Date.now(),
// 		value: Math.floor(Math.random() * 100),
// 	}

// 	const eventData = {
// 		id: 'some-uuid',
// 		name: 'exampleEvent',
// 		timestamp: new Date().toISOString(),
// 		eventType: 'exampleEventType',
// 		payload: randomPayload,
// 	}

// 	io.emit('webhook', eventData)

// 	console.log('Sent webhook data:', { type: 'random', payload: randomPayload })
// })
