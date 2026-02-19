import { useNavigate } from 'react-router-dom'
import { useChartStore } from '../../store'
import './footer.css'

export function Footer() {
  const navigate = useNavigate()
  const chartsCount = useChartStore((state) => state.chartsCount)

  const handleFooterClick = () => {
    navigate('/gallery')
  }

  return (
    <footer className="footer" onClick={handleFooterClick}>
      <p className="footer-text">
        Total Charts: <span className="footer-count">{chartsCount}</span>
      </p>
    </footer>
  )
}
