import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found-page main-layout">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </section>
  )
}
