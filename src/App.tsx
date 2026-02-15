import { createHashRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layouts'
import { HomePage, AboutPage, EditorPage, GalleryPage, NotFoundPage } from './pages'

const router = createHashRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
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
            },
            {
                path: 'editor/:id',
                element: <EditorPage />
            },
            {
                path: 'gallery',
                element: <GalleryPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
])

export function App() {
    return <RouterProvider router={router} />
}
