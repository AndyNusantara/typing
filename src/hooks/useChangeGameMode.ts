import { useDispatch, useSelector } from 'react-redux'
import { changeGameMode, setTimer } from '../slices/gameStateSlice'
import { GameMode } from '../utils/types'
import { useGenerateWords } from './useGenerateWords'
import { RootState } from '../store/store'

const useChangeGameMode = () => {
	const dispatch = useDispatch()
	const { generate } = useGenerateWords()
	const activeModeParameter = useSelector(
		(state: RootState) => state.gameState.modeParameter
	)

	const handleChangeGameMode = (mode: GameMode) => {
		dispatch(changeGameMode(mode))

		if (mode === 'timer') {
			generate(100)
			dispatch(setTimer(activeModeParameter))
		} else {
			generate(activeModeParameter)
			dispatch(setTimer(0))
		}
	}

	return { handleChangeGameMode }
}

export default useChangeGameMode
