import { ButtonHTMLAttributes, ReactElement } from 'react'

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
	title: string
	children: ReactElement
}

const Button: React.FC<ButtonPropsType> = (props) => {
	return (
		<button {...props} className="p-2">
			{props.children}
		</button>
	)
}
export default Button
