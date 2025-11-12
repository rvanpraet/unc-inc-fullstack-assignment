import './styles/App.css'
import { AuthProvider } from './contexts/AuthProvider'
import InnerApp from './InnerApp'

function App() {
    return (
        <AuthProvider>
            <InnerApp />
        </AuthProvider>
    )
}
export default App
