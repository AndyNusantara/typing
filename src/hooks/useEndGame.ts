import { useDispatch } from 'react-redux'
import { resetTimer, toggleGame } from '../slices/gameStateSlice'

const useEndGame = () => {
	const dispatch = useDispatch()

	const endGame = () => {
		dispatch(toggleGame())
		dispatch(resetTimer())
	}

	return { endGame }
}

export default useEndGame
