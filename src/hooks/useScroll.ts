import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const useScroll = () => {
	const wordState = useSelector((state: RootState) => state.words.wordState)
	const activeWordIndex = wordState.findIndex((item) => item === 'active')

	useEffect(() => {
		const wordElement = document.getElementById(`word-${activeWordIndex}`)

		if (wordElement) {
			wordElement.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
		}
	}, [activeWordIndex])
}

export default useScroll
