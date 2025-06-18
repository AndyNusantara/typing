import { createContext, RefObject, SetStateAction } from 'react'

type FocusContextValue = {
	inputRef: RefObject<HTMLInputElement>
	focusInput: () => void
	blurInput: () => void
	isFocus: boolean
	setIsFocus: React.Dispatch<SetStateAction<boolean>>
}

export const FocusContext = createContext<FocusContextValue | undefined>(
	undefined
)
