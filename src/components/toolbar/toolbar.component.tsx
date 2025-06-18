import { useSelector } from 'react-redux'
import { Tools, ToolsType } from '../../utils/types'
import { RootState } from '../../store/store'

type ToolBarPropsType = {
	components: Tools[]
}

const ToolBar: React.FC<ToolBarPropsType> = ({ components }) => {
	const activeGameMode = useSelector(
		(state: RootState) => state.gameState.gameMode
	)
	const activeModeParameter = useSelector(
		(state: RootState) => state.gameState.modeParameter
	)

	const getIsButtonActive = (type: ToolsType) => {
		if (type === 'game-mode') return activeGameMode
		return activeModeParameter
	}

	return (
		<div className="flex gap-2">
			{components.map((item) => {
				if (item.type === 'game-mode') {
					if (getIsButtonActive(item.type) === item.key) {
						return (
							<div key={item.key} className="text-yellow-500">
								{item.component}
							</div>
						)
					}
					return <div key={item.key}>{item.component}</div>
				}
			})}
			<span className="flex justify-center items-center text-slate-600 text-lg">
				<p>|</p>
			</span>
			{components.map((item) => {
				if (item.type === 'mode-parameter') {
					if (getIsButtonActive(item.type) === item.key) {
						return (
							<div key={item.key} className="text-yellow-500">
								{item.component}
							</div>
						)
					}
					return <div key={item.key}>{item.component}</div>
				}
			})}
		</div>
	)
}
export default ToolBar
