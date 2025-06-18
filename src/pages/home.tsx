import ToolBar from '../components/toolbar/toolbar.component'
import TypingArea from '../components/typingArea/typingArea.component'
import { ToolbarButtons } from '../components/toolbar/toolbarButton'
import useScroll from '../hooks/useScroll'

const Home = () => {
	useScroll()

	return (
		<div className="flex flex-col justify-center items-center">
			<ToolBar components={ToolbarButtons} />
			<div className="flex justify-center items-center">
				<TypingArea />
			</div>
		</div>
	)
}

export default Home
