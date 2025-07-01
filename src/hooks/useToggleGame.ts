import { useDispatch, useSelector } from 'react-redux'
import { resetTimer, toggleGame } from '../slices/gameStateSlice'
import { useGenerateWords } from './useGenerateWords'
import { RootState } from '../store/store'

const useToggleGame = () => {
	const dispatch = useDispatch()
	const { generate } = useGenerateWords()
	const gameMode = useSelector((state: RootState) => state.gameState.gameMode)
	const isGameEnded = useSelector((state: RootState) => state.gameState.endGame)

	const toggleGameState = () => {
		if (isGameEnded) {
			if (gameMode === 'words') {
				generate()
			} else {
				generate(200)
			}
		}
		dispatch(toggleGame())
		dispatch(resetTimer())
	}

	return { toggleGameState }
}

export default useToggleGame
