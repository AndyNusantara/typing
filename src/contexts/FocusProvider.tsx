import { ReactNode, RefObject, useCallback, useRef, useState } from 'react'
import { FocusContext } from './FocusContext'

const FocusProvider = ({ children }: { children: ReactNode }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isFocus, setIsFocus] = useState<boolean>(true)

	const focusInput = useCallback(() => {
		inputRef.current?.focus()
		setIsFocus(true)
	}, [])

	const blurInput = useCallback(() => {
		setIsFocus(false)
	}, [])

	return (
		<FocusContext.Provider
			value={{
				inputRef: inputRef as RefObject<HTMLInputElement>,
				focusInput,
				blurInput,
				isFocus,
				setIsFocus
			}}
		>
			{children}
		</FocusContext.Provider>
	)
}

export default FocusProvider
