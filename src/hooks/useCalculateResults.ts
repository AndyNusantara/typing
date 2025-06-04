import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useMemo } from 'react'
import { LETTER_STATES } from '../utils/const'

const useCalculateResults = () => {
	const letterState = useSelector((state: RootState) => state.words.letterState)
	const timer = useSelector((state: RootState) => state.gameState.timer)
	// const gameMode = useSelector((state: RootState) => state.gameState.gameMode)

	const { correctLetters, incorrectLetters } = useMemo(() => {
		let correctCount = 0
		let incorrectCount = 0

		letterState.flat().forEach((letter) => {
			if (letter === LETTER_STATES.CORRECT) correctCount++
			if (letter === LETTER_STATES.INCORRECT) incorrectCount++
		})

		return { correctLetters: correctCount, incorrectLetters: incorrectCount }
	}, [letterState])

	return useMemo(() => {
		const timeInMinutes = timer / 60
		const totalLetters = correctLetters + incorrectLetters

		const wpm = Math.round(correctLetters / 5 / Math.max(timeInMinutes, 0.1))

		const accuracy =
			totalLetters > 0 ? Math.round((correctLetters / totalLetters) * 100) : 0

		return {
			wpm,
			accuracy,
			errorRate: incorrectLetters,
			correctLetters,
			incorrectLetters,
			timer
		}
	}, [timer, correctLetters, incorrectLetters])
}

export default useCalculateResults
