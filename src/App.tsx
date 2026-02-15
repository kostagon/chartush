import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layouts'
import { HomePage, AboutPage, EditorPage } from './pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'editor',
                element: <EditorPage />
            }
        ]
    }
])

export function App() {
    return <RouterProvider router={router} />
}
