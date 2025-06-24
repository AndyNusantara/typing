import { RefObject, useState } from 'react'
import { LetterState, WordState } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '../store/store'
import {
	changeLetterState,
	changeWordState,
	incrementWordIndex
} from '../slices/wordsSlice'
import { startTimer } from '../slices/gameStateSlice'
import { LETTER_STATES } from '../utils/const'
import useEndGame from './useEndGame'

type useTypingProps = {
	inputRef: RefObject<HTMLInputElement | null>
	words: string[]
}

const useTyping = ({ inputRef, words }: useTypingProps) => {
	const dispatch = useDispatch()
	const letterState = useSelector((state: RootState) => state.words.letterState)
	const isTimerStart = useSelector(
		(state: RootState) => state.gameState.isTimerStart
	)
	const wordPosition = useSelector((state: RootState) => state.words.wordIndex)
	const timer = useSelector((state: RootState) => state.gameState.timer)
	const gameMode = useSelector((state: RootState) => state.gameState.gameMode)
	const { endGame } = useEndGame()
	const [previousInput, setPreviousInput] = useState('')
	const [ctrlPressed, setCtrlPressed] = useState(false)

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Control') {
			setCtrlPressed(true)
		}
	}

	const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Control') {
			setCtrlPressed(false)
		}
	}

	const changeLetterStateHandler = (
		wordIndex: number,
		letterIndex: number,
		newState: LetterState
	) => {
		dispatch(
			changeLetterState({
				wordIndex,
				letterIndex,
				newState
			})
		)
	}

	const changeWordStateHandler = (index: number, state: WordState) => {
		dispatch(
			changeWordState({
				index: index,
				state: state
			})
		)
	}

	const markWordState = () => {
		const latestState = store.getState().words.letterState

		const allLettersCorrect = latestState[wordPosition].every(
			(item) => !item.includes('incorrect')
		)

		if (allLettersCorrect) {
			changeWordStateHandler(wordPosition, 'correct typed')
		} else {
			changeWordStateHandler(wordPosition, 'incorrect typed')
		}
	}

	const markIncompleteLettersAsIncorrect = (letterPosition: number) => {
		if (letterPosition >= words[wordPosition].length) return

		for (let i = letterPosition; i < words[wordPosition].length; i++) {
			changeLetterStateHandler(wordPosition, i, 'incorrect')
		}
	}

	const resetInputField = () => {
		if (inputRef.current) inputRef.current.value = ''
		setPreviousInput('')
	}

	const advanceToNextWord = () => {
		dispatch(incrementWordIndex())
	}

	const markLastLetterState = (isCorrect: boolean) => {
		const state = isCorrect ? LETTER_STATES.CORRECT : LETTER_STATES.INCORRECT
		changeLetterStateHandler(
			wordPosition,
			words[wordPosition].length - 1,
			state
		)
	}

	const activateNextWord = () => {
		changeLetterStateHandler(wordPosition + 1, 0, LETTER_STATES.ACTIVE)
		changeWordStateHandler(wordPosition + 1, 'active')
	}

	const activateNextLetter = (letterPosition: number) => {
		changeLetterStateHandler(
			wordPosition,
			letterPosition + 1,
			LETTER_STATES.ACTIVE
		)
	}

	const handleEndGame = () => {
		endGame()
		return
	}

	const handleBackspace = (letterDeleted: number) => {
		const currentPos = inputRef.current?.value.length || 0

		if (ctrlPressed) {
			for (let i = letterDeleted; i >= 0; i--) {
				changeLetterStateHandler(wordPosition, i, LETTER_STATES.UNTYPED)
			}
			changeLetterStateHandler(wordPosition, 0, LETTER_STATES.ACTIVE)
		} else {
			changeLetterStateHandler(wordPosition, currentPos, LETTER_STATES.ACTIVE)
			changeLetterStateHandler(
				wordPosition,
				currentPos + 1,
				LETTER_STATES.UNTYPED
			)
		}
	}

	const handleNextWord = (
		letterPosition: number,
		isLastActiveCorrect: boolean,
		isEndGame: boolean
	) => {
		markIncompleteLettersAsIncorrect(letterPosition)

		resetInputField()

		advanceToNextWord()

		markLastLetterState(isLastActiveCorrect)

		markWordState()

		if (isEndGame) {
			handleEndGame()
		} else {
			activateNextWord()
		}
	}

	const handleLetterStateUpdate = (
		letterPosition: number,
		isCorrect: boolean,
		isLastLetter: boolean
	) => {
		const baseState = isCorrect
			? LETTER_STATES.CORRECT
			: LETTER_STATES.INCORRECT

		changeLetterStateHandler(wordPosition, letterPosition, baseState)

		if (isLastLetter) {
			const lastState = isCorrect
				? LETTER_STATES.LAST_CORRECT
				: LETTER_STATES.LAST_INCORRECT
			changeLetterStateHandler(wordPosition, letterPosition, lastState)
		}

		if (letterPosition < words[wordPosition].length - 1) {
			activateNextLetter(letterPosition)
		}
	}

	const onInputChange = (value: string) => {
		const letterPosition = value.length - 1
		const isNextWord = value.endsWith(' ')
		const isBackspace = value.length < previousInput.length
		const isCorrect =
			value[letterPosition] === words[wordPosition][letterPosition]
		const isLastActiveCorrect =
			letterState[wordPosition][words[wordPosition].length - 1] ===
			LETTER_STATES.LAST_CORRECT
		const isExtra = value.length > words[wordPosition].length && !isNextWord
		const isLastLetter = value.length >= words[wordPosition].length
		const isLastWord = words.length === wordPosition + 1
		const hasTyped = isNextWord || inputRef.current?.value.trim() !== ''
		const isWordModeEnd =
			(isLastWord && isLastLetter) || (isLastWord && isNextWord)
		const isTimerModeEnd = gameMode === 'timer' && timer === 0

		setPreviousInput(value)

		if (!isTimerStart && hasTyped) {
			dispatch(startTimer())
		}

		if (isExtra && inputRef.current?.value) {
			inputRef.current.value = value.substring(0, letterPosition)
			return
		}

		if (isBackspace) {
			handleBackspace(previousInput.length - value.length)
			return
		}

		if (isNextWord) {
			handleNextWord(letterPosition, isLastActiveCorrect, isWordModeEnd)
			return
		}

		if (isWordModeEnd || isTimerModeEnd) {
			handleEndGame()
			return
		}

		handleLetterStateUpdate(letterPosition, isCorrect, isLastLetter)
		return
	}

	return { onInputChange, onKeyDown, onKeyUp }
}

export default useTyping
