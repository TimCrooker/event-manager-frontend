import { createContext, useContext, useState } from 'react'

interface SubscribedEventsContextValue {
	subscribedEventTypes: string[]
	addEventType: (eventType: string) => void
	setEventTypes: (eventTypes: string[]) => void
}

const SubscribedEventsContext =
	createContext<SubscribedEventsContextValue | null>(null)

export const useSubscribedEvents = () => {
	const context = useContext(SubscribedEventsContext)
	if (!context) {
		throw new Error(
			'useSubscribedEvents must be used within a SubscribedEventsProvider'
		)
	}
	return context
}

export const SubscribedEventsProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [subscribedEventTypes, setSubscribedEventTypes] = useState<string[]>([])

	const addEventType = (eventType: string) => {
		// ensure that the event type is not already in the list
		if (subscribedEventTypes.includes(eventType)) {
			return
		}
		
		setSubscribedEventTypes((prevEventTypes) => [...prevEventTypes, eventType])
	}

	const setEventTypes = (eventTypes: string[]) => {
		setSubscribedEventTypes(eventTypes)
	}

	const value = {
		subscribedEventTypes,
		addEventType,
		setEventTypes,
	}

	return (
		<SubscribedEventsContext.Provider value={value}>
			{children}
		</SubscribedEventsContext.Provider>
	)
}

export default SubscribedEventsContext
