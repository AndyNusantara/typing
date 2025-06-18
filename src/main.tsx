import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import FocusProvider from './contexts/FocusProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<FocusProvider>
			<App />
		</FocusProvider>
	</Provider>
)
