import { useCallback, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { RootState } from '../../store/store'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import useTyping from '../../hooks/useTyping'
import { stopTimer } from '../../slices/gameStateSlice'
import { LetterState } from '../../utils/types'
import useFocus from '../../hooks/useFocus'

import '../../styling/typingArea.css'
import { useGenerateWords } from '../../hooks/useGenerateWords'
import Timer from './timer.component'
import Button from '../button/button.component'
import Blur from './blur.component'

const TypingArea = () => {
	const dispatch = useDispatch()

	const { words, letterState } = useSelector(
		(state: RootState) => state.words,
		shallowEqual
	)

	const { inputRef, focusInput, blurInput, isFocus } = useFocus()
	const { onInputChange, onKeyDown, onKeyUp } = useTyping({
		inputRef,
		words
	})
	const { generate } = useGenerateWords()

	const getLetterState = useCallback((state: LetterState) => {
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
	}, [])

	useEffect(() => {
		generate(80)
	}, [generate])

	useEffect(() => {
		if (!isFocus) {
			dispatch(stopTimer())
		}
	}, [isFocus, dispatch])

	return (
		<div className="flex flex-col w-3/4">
			<Timer />
			<div className="flex flex-col gap-2 h-52">
				<div className="relative h-52">
					<div
						className="w-full overflow-hidden max-h-2/3"
						onClick={focusInput}
					>
						<div className="flex flex-wrap gap-2 w-auto overflow-hidden">
							{words.map((item, wordIndex) => {
								return (
									<span id={`word-${wordIndex}`} key={`word-${wordIndex}`}>
										{item.split('').map((letter, index) => {
											const state = letterState[wordIndex]?.[index] || 'untyped'

											return (
												<span
													key={letter + index}
													className={getLetterState(state as LetterState)}
												>
													{letter}
												</span>
											)
										})}
									</span>
								)
							})}
						</div>
						<input
							ref={inputRef}
							aria-label="input"
							autoFocus
							onKeyDown={onKeyDown}
							onKeyUp={onKeyUp}
							onBlur={blurInput}
							onChange={(e) => onInputChange(e.target.value)}
							className="absolute top-0 left-0 border-0 outline-hidden border-hidden opacity-0"
						/>
						{!isFocus && <Blur />}
					</div>
				</div>

				<div className="flex justify-center items-center">
					<Button
						title="Re-generate words"
						onClick={() => generate(100)}
						className="!bg-transparent border-none focus:!outline-0 hover:!border-none !transition-none"
					>
						<Icon
							icon="material-symbols:refresh-rounded"
							className="size-8 text-slate-400"
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default TypingArea
