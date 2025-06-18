import { Icon } from '@iconify/react/dist/iconify.js'
import useCalculateResults from '../hooks/useCalculateResults'
import '../styling/statusComponent.css'

type StatusPropsType = {
	toggleStatusComponent: () => void
}

const Status: React.FC<StatusPropsType> = ({ toggleStatusComponent }) => {
	const { wpm, accuracy, errorRate, timer } = useCalculateResults()

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-5">
			<div className="grid grid-cols-2 gap-10 lg:flex lg:gap-20">
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
					<h2>Error</h2>
					<h1>{errorRate}</h1>
				</span>
				<span className="flex flex-col">
					<h2>Time</h2>
					<span>
						<h1 className="inline">{timer}</h1>
						<h2 className="suffix">s</h2>
					</span>
				</span>
			</div>
			<button
				title="Retry Again"
				onClick={toggleStatusComponent}
				className="bg-transparent"
			>
				<Icon icon="pajamas:retry" className="size-8 text-slate-400" />
			</button>
		</div>
	)
}

export default Status
