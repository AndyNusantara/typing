import { useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { RootState } from '../../store/store'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import useTyping from '../../hooks/useTyping'
import { stopTimer } from '../../slices/gameStateSlice'
import useFocus from '../../hooks/useFocus'

import '../../styling/typingArea.css'
import { useGenerateWords } from '../../hooks/useGenerateWords'
import Timer from './timer.component'
import Button from '../button/button.component'
import Blur from './blur.component'
import WordList from './wordList.component'

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

	useEffect(() => {
		if (words.length === 0) {
			generate(200)
		}
	}, [words, generate])

	useEffect(() => {
		if (!isFocus) {
			dispatch(stopTimer())
		}
	}, [isFocus, dispatch])

	return (
		<div className="flex flex-col w-3/4">
			<Timer />
			<div className="flex flex-col gap-2 h-52">
				<div className="relative h-full">
					<div className="w-full overflow-hidden max-h-32" onClick={focusInput}>
						<WordList words={words} letterState={letterState} />
						<input
							ref={inputRef}
							aria-label="input"
							autoFocus
							onKeyDown={onKeyDown}
							onKeyUp={onKeyUp}
							onBlur={blurInput}
							onChange={(e) => onInputChange(e.target.value)}
							className="absolute top-0 left-0 w-0 h-0 border-0 outline-hidden border-hidden opacity-0"
						/>
						{!isFocus && <Blur />}
					</div>
				</div>

				<div className="flex justify-center items-center">
					<Button
						title="Re-generate words"
						onClick={() => generate()}
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
