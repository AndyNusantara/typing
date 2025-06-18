import { Icon } from '@iconify/react/dist/iconify.js'
import Button from '../button/button.component'

import { GameMode, Parameter, Tools } from '../../utils/types'

import { ReactElement, ReactNode } from 'react'
import useChangeParameter from '../../hooks/useChangeParameter'
import useChangeGameMode from '../../hooks/useChangeGameMode'

type ButtonComponentType = {
	title: string
	mode?: GameMode
	parameter?: Parameter
	children: ReactNode & ReactElement
}

const ButtonComponent: React.FC<ButtonComponentType> = ({
	title,
	mode,
	parameter,
	children
}) => {
	const { handleChangeGameMode } = useChangeGameMode()
	const { handleChangeGameParameter } = useChangeParameter()

	const handleClick = (parameter?: Parameter) => {
		if (mode) handleChangeGameMode(mode)
		if (parameter) handleChangeGameParameter(parameter)
	}

	return (
		<Button title={title} type="button" onClick={() => handleClick(parameter)}>
			{children}
		</Button>
	)
}

export const ToolbarButtons = [
	{
		component: (
			<ButtonComponent title="timer-mode" mode="timer">
				<span className="flex gap-1 items-center justify-center text-lg">
					<Icon icon="fluent:timer-12-regular" />
					<h5>timer</h5>
				</span>
			</ButtonComponent>
		),
		key: 'timer',
		type: 'game-mode'
	},
	{
		component: (
			<ButtonComponent title="words-mode" mode="words">
				<span className="flex gap-1 items-center justify-center text-lg">
					<Icon icon="fluent:timer-12-regular" />
					<h5>words</h5>
				</span>
			</ButtonComponent>
		),
		key: 'words',
		type: 'game-mode'
	},
	{
		component: (
			<ButtonComponent title="60" parameter={60}>
				<span className="flex items-center justify-center text-lg">
					<h5>60</h5>
				</span>
			</ButtonComponent>
		),
		key: 60,
		type: 'mode-parameter'
	},
	{
		component: (
			<ButtonComponent title="30" parameter={30}>
				<span className="flex items-center justify-center text-lg">
					<h5>30</h5>
				</span>
			</ButtonComponent>
		),
		key: 30,
		type: 'mode-parameter'
	},
	{
		component: (
			<ButtonComponent title="15" parameter={15}>
				<span className="flex items-center justify-center text-lg">
					<h5>15</h5>
				</span>
			</ButtonComponent>
		),
		key: 15,
		type: 'mode-parameter'
	}
] as Tools[]
