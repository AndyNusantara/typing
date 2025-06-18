import { useCallback } from 'react'
import { LetterState } from '../../utils/types'

type WordListPropsType = {
	words: string[]
	letterState: string[][]
}

const WordList: React.FC<WordListPropsType> = ({ words, letterState }) => {
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

	return (
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
	)
}

export default WordList
