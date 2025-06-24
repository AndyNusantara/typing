import { Icon } from '@iconify/react/dist/iconify.js'
import useCalculateResults from '../hooks/useCalculateResults'
import '../styling/result.css'

type ResultPropsType = {
	toggleResultComponent: () => void
}

const Result: React.FC<ResultPropsType> = ({ toggleResultComponent }) => {
	const { wpm, accuracy, characters, time } = useCalculateResults()

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-5">
			<div className="grid grid-cols-2 ml-5 gap-10 lg:flex lg:flex-wrap lg:gap-32">
				<span className="flex flex-col">
					<h2>WPM</h2>
					<h1>{wpm}</h1>
				</span>
				<span className="flex flex-col">
					<h2>Acc</h2>
					<span>
						<h1 className="inline">{accuracy}</h1>
						<h2 className="suffix">%</h2>
					</span>
				</span>
				<span className="flex flex-col">
					<h2>Characters</h2>
					<span>
						<h1>
							{characters.correctLetters}/{characters.incorrectLetters}
						</h1>
					</span>
				</span>
				<span className="flex flex-col">
					<h2>Time</h2>
					<span>
						<h1 className="inline">{time}</h1>
						<h2 className="suffix">s</h2>
					</span>
				</span>
			</div>
			<button
				title="Retry Again"
				onClick={toggleResultComponent}
				className="bg-transparent"
			>
				<Icon icon="pajamas:retry" className="size-8 text-slate-400" />
			</button>
		</div>
	)
}

export default Result
