import { useDispatch, useSelector } from 'react-redux'
import { Parameter } from '../utils/types'
import { RootState } from '../store/store'
import { changeModeParameter, setTimer } from '../slices/gameStateSlice'
import { useGenerateWords } from './useGenerateWords'
import useFocus from './useFocus'

const useChangeParameter = () => {
	const dispatch = useDispatch()
	const activeModeParameter = useSelector(
		(state: RootState) => state.gameState.modeParameter
	)
	const activeGameMode = useSelector(
		(state: RootState) => state.gameState.gameMode
	)
	const { generate } = useGenerateWords()
	const { focusInput } = useFocus()

	const handleChangeGameParameter = (parameter: Parameter) => {
		dispatch(changeModeParameter(parameter))
		dispatch(setTimer(activeModeParameter))
		if (activeGameMode === 'words') {
			generate(parameter)
		} else {
			focusInput()
			dispatch(setTimer(parameter))
		}
	}

	return { handleChangeGameParameter }
}

export default useChangeParameter
