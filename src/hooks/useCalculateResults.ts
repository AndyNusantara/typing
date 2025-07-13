import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { LETTER_STATES } from '../utils/const'

const useCalculateResults = () => {
	const letterState = useSelector((state: RootState) => state.words.letterState)
	const timer = useSelector((state: RootState) => state.gameState.timer)
	const gameMode = useSelector((state: RootState) => state.gameState.gameMode)
	const modeParameter = useSelector(
		(state: RootState) => state.gameState.modeParameter
	)

	const calculate = () => {
		let correctCount = 0
		let incorrectCount = 0

		letterState.flat().forEach((letter) => {
			if (letter === LETTER_STATES.CORRECT) correctCount++
			if (letter === LETTER_STATES.INCORRECT) incorrectCount++
		})

		return { correctLetters: correctCount, incorrectLetters: incorrectCount }
	}

	const { correctLetters, incorrectLetters } = calculate()

	const getTime = () => {
		if (gameMode === 'words') {
			return timer
		}
		return modeParameter
	}

	const timeInMinutes = timer / 60
	const totalLetters = correctLetters + incorrectLetters

	const wpm = Math.round(correctLetters / 5 / Math.max(timeInMinutes, 0.1))

	const accuracy =
		totalLetters > 0 ? Math.round((correctLetters / totalLetters) * 100) : 0

	const characters = { correctLetters, incorrectLetters }

	return {
		wpm,
		accuracy,
		characters,
		time: getTime()
	}
}

export default useCalculateResults
