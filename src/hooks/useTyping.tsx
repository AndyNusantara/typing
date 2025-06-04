import { RefObject, useState } from 'react'
import { LetterState } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { changeLetterState } from '../slices/wordsSlice'
import { toggleGame, toggleTimer } from '../slices/gameStateSlice'
import { LETTER_STATES } from '../utils/const'

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

	const [previousInput, setPreviousInput] = useState('')
	const [wordPosition, setWordPosition] = useState<number>(0)
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

	const changeState = (
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

	const markIncompleteLettersAsIncorrect = (letterPosition: number) => {
		if (letterPosition >= words[wordPosition].length) return

		for (let i = letterPosition; i < words[wordPosition].length; i++) {
			changeState(wordPosition, i, 'incorrect')
		}
	}

	const resetInputField = () => {
		if (inputRef.current) inputRef.current.value = ''
		setPreviousInput('')
	}

	const advanceToNextWord = () => {
		setWordPosition((prev) => prev + 1)
	}

	const markLastLetterState = (isCorrect: boolean) => {
		const state = isCorrect ? LETTER_STATES.CORRECT : LETTER_STATES.INCORRECT
		changeState(wordPosition, words[wordPosition].length - 1, state)
	}

	const activateNextWord = () => {
		changeState(wordPosition + 1, 0, LETTER_STATES.ACTIVE)
	}

	const activateNextLetter = (letterPosition: number) => {
		changeState(wordPosition, letterPosition + 1, LETTER_STATES.ACTIVE)
	}

	const handleEndGame = () => {
		dispatch(toggleGame())
		dispatch(toggleTimer())
		return
	}

	const handleBackspace = (letterDeleted: number) => {
		const currentPos = inputRef.current?.value.length || 0

		if (ctrlPressed) {
			for (let i = letterDeleted; i >= 0; i--) {
				changeState(wordPosition, i, LETTER_STATES.UNTYPED)
			}
			changeState(wordPosition, 0, LETTER_STATES.ACTIVE)
		} else {
			changeState(wordPosition, currentPos, LETTER_STATES.ACTIVE)
			changeState(wordPosition, currentPos + 1, LETTER_STATES.UNTYPED)
		}
	}

	const handleNextWord = (
		letterPosition: number,
		isLastActiveCorrect: boolean,
		isEndGame: boolean
	) => {
		// const handleNoInput = (letterPosition: number) => {
		// 	if (letterPosition != words[wordPosition].length) {
		// 		for (let i = letterPosition; i < words[wordPosition].length; i++) {
		// 			changeState(wordPosition, i, 'incorrect')
		// 		}
		// 	}
		// }

		// 	if (isLastActiveCorrect) {
		// 	changeState(wordPosition, words[wordPosition].length - 1, 'correct')
		// } else {
		// 	changeState(wordPosition, words[wordPosition].length - 1, 'incorrect')
		// }

		markIncompleteLettersAsIncorrect(letterPosition)

		resetInputField()

		advanceToNextWord()

		markLastLetterState(isLastActiveCorrect)

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

		changeState(wordPosition, letterPosition, baseState)

		if (isLastLetter) {
			const lastState = isCorrect
				? LETTER_STATES.LAST_CORRECT
				: LETTER_STATES.LAST_INCORRECT
			changeState(wordPosition, letterPosition, lastState)
		}

		activateNextLetter(letterPosition)
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
		const isEndGame = (isLastWord && isLastLetter) || (isLastWord && isNextWord)
		const hasTyped = isNextWord || inputRef.current?.value.trim() !== ''

		setPreviousInput(value)

		if (!isTimerStart && hasTyped) {
			dispatch(toggleTimer())
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
			handleNextWord(letterPosition, isLastActiveCorrect, isEndGame)
			return
		}

		if (isEndGame) {
			handleEndGame()
			return
		}

		handleLetterStateUpdate(letterPosition, isCorrect, isLastLetter)
		return
	}

	return { onInputChange, onKeyDown, onKeyUp }
}

export default useTyping
