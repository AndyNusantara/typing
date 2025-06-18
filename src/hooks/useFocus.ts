import { useContext } from 'react'
import { FocusContext } from '../contexts/FocusContext'

const useFocus = () => {
	const context = useContext(FocusContext)
	if (!context) {
		throw new Error(
			'FocusContext might not be properly initialized. ' +
				'Ensure your component is wrapped in <FocusProvider>'
		)
	}

	return context
}

export default useFocus
