import useCalculateResults from '../hooks/useCalculateResults'

type StatusComponentPropsType = {
	toggleStatusComponent: () => void
}

const StatusComponent: React.FC<StatusComponentPropsType> = ({
	toggleStatusComponent
}) => {
	const { wpm, accuracy, errorRate, timer } = useCalculateResults()

	return (
		<div>
			<h1>WPM: {wpm}</h1>
			<h1>ACC: {accuracy}</h1>
			<h1>ERROR: {errorRate}</h1>
			<h1>TIME: {timer}s</h1>
			<button
				title="closeStatusComponent"
				onClick={toggleStatusComponent}
				className="bg-transparent"
			>
				Reroll
			</button>
		</div>
	)
}

export default StatusComponent
