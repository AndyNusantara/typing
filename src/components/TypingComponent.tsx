import { useCallback, useEffect, useRef } from 'react'
import useTyping from '../hooks/useTyping'
import { LetterState } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { generateWords } from '../slices/wordsSlice'
import { Icon } from '@iconify/react/dist/iconify.js'

import '../styling/typingComponent.css'
import { startTimer } from '../slices/gameStateSlice'

const TypingComponent = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const isTimerStart = useSelector(
		(state: RootState) => state.gameState.isTimerStart
	)

	const timer = useSelector((state: RootState) => state.gameState.timer)

	const dispatch = useDispatch()
	const { words, letterState } = useSelector((state: RootState) => ({
		words: state.words.words,
		letterState: state.words.letterState
	}))

	const { onInputChange, onKeyDown, onKeyUp } = useTyping({
		inputRef,
		words
	})

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

	const generate = useCallback(() => {
		dispatch(generateWords())
	}, [dispatch])

	useEffect(() => {
		generate()
	}, [generate])

	useEffect(() => {
		if (isTimerStart) {
			const interval = setInterval(() => {
				dispatch(startTimer())
			}, 1000)

			return () => {
				if (interval) clearInterval(interval)
			}
		}
	}, [isTimerStart, dispatch])

	return (
		<div className="grid grid-rows-2 w-2px">
			<span className="text-yellow-500">{timer}</span>
			<div className="grid grid-rows-2 w-20px">
				<div
					className="relative w-full h-full"
					onClick={() => {
						if (inputRef.current) inputRef.current.focus()
					}}
				>
					<div className="flex flex-wrap gap-2">
						{words.map((item, wordIndex) => {
							return (
								<div className="w-auto" key={item + wordIndex}>
									{item.split('').map((letter, index) => {
										const state = letterState[wordIndex]?.[index] || 'untyped'

										return (
											<span
												key={letter + index}
												className={`
											${getLetterState(state as LetterState)}
										`}
											>
												{letter}
											</span>
										)
									})}
								</div>
							)
						})}
					</div>
					<input
						ref={inputRef}
						aria-label="input"
						autoFocus
						onKeyDown={onKeyDown}
						onKeyUp={onKeyUp}
						onChange={(e) => onInputChange(e.target.value)}
						className="absolute top-0 left-0 text-wrap border-0 outline-hidden border-hidden opacity-0"
					/>
				</div>
				<div className="flex justify-center items-center w-full">
					<button
						title="regenerate"
						onClick={generate}
						className="!bg-transparent border-none focus:!outline-0 hover:!border-none !transition-none"
					>
						<Icon
							icon="material-symbols:refresh-rounded"
							className="size-8 text-slate-300"
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default TypingComponent
