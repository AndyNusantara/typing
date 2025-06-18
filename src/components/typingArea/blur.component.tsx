import { motion } from 'motion/react'
import useFocus from '../../hooks/useFocus'

const Blur = () => {
	const { focusInput } = useFocus()

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.5 } }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15 }}
			className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs opacity-90"
			onClick={() => focusInput()}
		>
			Click here to focus
		</motion.div>
	)
}

export default Blur
