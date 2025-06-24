import { useDispatch, useSelector } from 'react-redux'
import { resetTimer, toggleGame } from '../slices/gameStateSlice'
import { RootState } from '../store/store'
import { useGenerateWords } from './useGenerateWords'

const useRestartGame = () => {
	const dispatch = useDispatch()
	const { generate } = useGenerateWords()
	const gameMode = useSelector((state: RootState) => state.gameState.gameMode)

	const restartGame = () => {
		if (gameMode === 'words') {
			generate()
		} else {
			generate(200)
		}
		dispatch(toggleGame())
		dispatch(resetTimer())
	}

	return { restartGame }
}

export default useRestartGame
