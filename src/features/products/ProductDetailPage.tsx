import { useParams } from 'react-router-dom'
import { Container } from '../../components/Container'

export function ProductDetailPage() {
  const { slug } = useParams()
  
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-heading text-charcoal-900 mb-4">
          Product Detail
        </h1>
        <p className="text-charcoal-700">Product: {slug}</p>
      </div>
    </Container>
  )
}

