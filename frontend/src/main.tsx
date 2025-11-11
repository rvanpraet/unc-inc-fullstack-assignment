import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// const rootElement = document.getElementById('app')!

// // if (!rootElement.innerHTML) {
// //   const root = ReactDOM.createRoot(rootElement)
// //   root.render(
// //     <React.StrictMode>
// //       <App />
// //     </React.StrictMode>,
// //   )
// // }

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
