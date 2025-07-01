import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useEffect } from 'react'
import { decrementTimer, incrementTimer } from '../slices/gameStateSlice'

const useTimer = () => {
	const dispatch = useDispatch()
	const isTimerStart = useSelector(
		(state: RootState) => state.gameState.isTimerStart
	)
	const activeGameMode = useSelector(
		(state: RootState) => state.gameState.gameMode
	)
	const timer = useSelector((state: RootState) => state.gameState.timer)

	useEffect(() => {
		if (!isTimerStart) return

		if (activeGameMode === 'words') {
			const interval = setInterval(() => {
				dispatch(incrementTimer())
			}, 1000)

			return () => clearInterval(interval)
		} else {
			const interval = setInterval(() => {
				dispatch(decrementTimer())
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [isTimerStart, dispatch, activeGameMode, timer])
}

export default useTimer
