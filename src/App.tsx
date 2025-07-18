import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Result from './pages/result'
import { motion } from 'motion/react'

import { AnimatePresence } from 'motion/react'
import Home from './pages/home'
import useToggleGame from './hooks/useToggleGame'

const App = () => {
	const isGameEnd = useSelector((state: RootState) => state.gameState.endGame)
	const { toggleGameState } = useToggleGame()

	const toggleResultComponent = () => {
		toggleGameState()
	}

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-zinc-700 text-3xl">
			<div className="w-full">
				<AnimatePresence mode="wait">
					{isGameEnd ? (
						<motion.div
							key="result"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
						>
							<Result toggleResultComponent={toggleResultComponent} />
						</motion.div>
					) : (
						<motion.div
							key="typing"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							className="flex justify-center items-center"
						>
							<Home />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default App
