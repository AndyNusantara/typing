import { generate } from 'random-words'
import { useEffect, useRef, useState } from 'react'

import './g.css'

type LetterState =
	| 'correct'
	| 'incorrect'
	| 'untyped'
	| 'active'
	| 'active is-last correct'
	| 'active is-last incorrect'

const COUNT = 50

const App = () => {
	const [words, setWords] = useState<string[]>([])
	const input = useRef<HTMLInputElement>(null)
	const [previousInput, setPreviousInput] = useState('')
	const [wordPosition, setWordPosition] = useState<number>(0)
	const [letterStates, setLetterStates] = useState<LetterState[][]>([])
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

	const generateWords = () => {
		const words = generate(COUNT) as string[]
		setWords(words)

		const initialStates = words.map((word) =>
			[...word].map(() => 'untyped' as LetterState)
		)
		initialStates[0][0] = 'active'
		setLetterStates(initialStates)
	}

	const changeLetterState = (
		wordIndex: number,
		LetterIndex: number,
		state: LetterState
	) => {
		setLetterStates((prevStates) => {
			const newStates = prevStates.map((word) => [...word])
			newStates[wordIndex][LetterIndex] = state
			return newStates
		})
	}

	const handleBackspace = (letterDeleted: number) => {
		const currentPos = input.current?.value.length || 0

		if (ctrlPressed) {
			for (let i = letterDeleted; i >= 0; i--) {
				changeLetterState(wordPosition, i, 'untyped')
			}
			changeLetterState(wordPosition, 0, 'active')
		} else {
			changeLetterState(wordPosition, currentPos, 'active')
			changeLetterState(wordPosition, currentPos + 1, 'untyped')
		}
	}

	const handleNextWord = (letterPosition: number) => {
		if (letterPosition != words[wordPosition].length) {
			for (let i = letterPosition; i < words[wordPosition].length; i++) {
				changeLetterState(wordPosition, i, 'incorrect')
			}
		}

		if (input.current) {
			input.current.value = ''
		}

		setPreviousInput('')
		setWordPosition((prev) => prev + 1)
		changeLetterState(wordPosition + 1, 0, 'active')
	}

	const onInputChange = (value: string) => {
		const letterPosition = value.length - 1
		const isNextWord = value.endsWith(' ')
		const isBackspace = value.length < previousInput.length
		const isCorrect =
			value[letterPosition] === words[wordPosition][letterPosition]
		const isLastActiveCorrect =
			letterStates[wordPosition][words[wordPosition].length - 1] ===
			'active is-last correct'
		const isExtra = value.length > words[wordPosition].length && !isNextWord
		const isLastLetter = value.length >= words[wordPosition].length

		setPreviousInput(value)

		if (isExtra && input.current?.value) {
			input.current.value = value.substring(0, letterPosition)
			return
		}

		if (isBackspace) {
			handleBackspace(previousInput.length - value.length)
			return
		}

		if (isNextWord) {
			handleNextWord(letterPosition)
			if (isLastActiveCorrect) {
				changeLetterState(
					wordPosition,
					words[wordPosition].length - 1,
					'correct'
				)
			}
			return
		}

		if (isCorrect) {
			changeLetterState(wordPosition, letterPosition, 'correct')
			if (isLastLetter) {
				changeLetterState(
					wordPosition,
					letterPosition,
					'active is-last correct'
				)
			}
		} else {
			changeLetterState(wordPosition, letterPosition, 'incorrect')
			if (isLastLetter) {
				changeLetterState(
					wordPosition,
					letterPosition,
					'active is-last incorrect'
				)
			}
		}

		changeLetterState(wordPosition, letterPosition + 1, 'active')
		return
	}

	const getLetterState = (state: LetterState) => {
		switch (state) {
			case 'correct':
				return 'letter text-slate-300'
			case 'incorrect':
				return 'letter text-red-500'
			case 'active':
				return 'letter active text-gray-500'
			case 'active is-last correct':
				return 'letter active is-last text-slate-300'
			case 'active is-last incorrect':
				return 'letter active is-last text-red-500'
			default:
				return 'letter text-gray-500'
		}
	}

	useEffect(() => {
		generateWords()
	}, [])

	return (
		<div className="bg-zinc-700 max-w-screen h-screen flex justify-center items-center">
			<div
				className="relative max-w-3/4 text-3xl flex justify-around items-center gap-1 flex-wrap"
				onClick={() => {
					if (input.current) input.current.focus()
				}}
			>
				{words.map((item, wordIndex) => {
					return (
						<div key={item + wordIndex}>
							{item.split('').map((letter, index) => {
								const state = letterStates[wordIndex]?.[index] || 'untyped'

								return (
									<span
										key={letter + index}
										className={`
											${getLetterState(state)}
										`}
									>
										{letter}
									</span>
								)
							})}
						</div>
					)
				})}
				<input
					ref={input}
					aria-label="input"
					autoFocus
					onKeyDown={onKeyDown}
					onKeyUp={onKeyUp}
					onChange={(e) => onInputChange(e.target.value)}
					className="absolute top-0 left-0 text-wrap border-0 outline-hidden border-hidden opacity-0"
				/>
			</div>
		</div>
	)
}

export default App
