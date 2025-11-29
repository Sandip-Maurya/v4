import { Container } from '../../components/Container'

export function HomePage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-heading text-charcoal-900 mb-4">
          Welcome to Dolce Fiore
        </h1>
        <p className="text-charcoal-700">
          Premium, handcrafted gift hampers rooted in health, sustainability, and conscious living.
        </p>
      </div>
    </Container>
  )
}

