import { memo } from 'react'

import useTimer from '../../hooks/useTimer'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Timer = memo(() => {
	const timer = useSelector((state: RootState) => state.gameState.timer)

	useTimer()

	return <span className="text-yellow-500">{timer}</span>
})

export default Timer
