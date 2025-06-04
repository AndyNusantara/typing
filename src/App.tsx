import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import StatusComponent from './components/StatusComponent'
import TypingComponent from './components/TypingComponent'
import { resetTimer, toggleGame } from './slices/gameStateSlice'
import { motion } from 'motion/react'

import { AnimatePresence } from 'motion/react'

const App = () => {
	const isGameEnd = useSelector((state: RootState) => state.gameState.endGame)
	const dispatch = useDispatch()

	const toggleStatusComponent = () => {
		dispatch(toggleGame())
		dispatch(resetTimer())
	}

	return (
		<div className="flex items-center w-screen h-screen bg-zinc-700 text-3xl">
			<AnimatePresence mode="wait">
				{isGameEnd ? (
					<motion.div
						key="status"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
					>
						<StatusComponent toggleStatusComponent={toggleStatusComponent} />
					</motion.div>
				) : (
					<motion.div
						key="typing"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
					>
						<TypingComponent />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default App
