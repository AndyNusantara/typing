import { useDispatch, useSelector } from 'react-redux'
import { Parameter } from '../utils/types'
import { RootState } from '../store/store'
import { changeModeParameter, setTimer } from '../slices/gameStateSlice'
import { useGenerateWords } from './useGenerateWords'
import useFocus from './useFocus'

const useChangeParameter = () => {
	const dispatch = useDispatch()

	const activeGameMode = useSelector(
		(state: RootState) => state.gameState.gameMode
	)
	const { generate } = useGenerateWords()
	const { focusInput } = useFocus()

	const handleChangeGameParameter = (parameter: Parameter) => {
		dispatch(changeModeParameter(parameter))

		if (activeGameMode === 'words') {
			generate(parameter)
			dispatch(setTimer(0))
		} else {
			focusInput()
			generate()
			dispatch(setTimer(parameter))
		}
	}

	return { handleChangeGameParameter }
}

export default useChangeParameter
