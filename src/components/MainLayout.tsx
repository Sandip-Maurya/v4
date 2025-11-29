import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './Container'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-beige-200">
        <Container>
          <nav className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-heading text-charcoal-900">
              Dolce Fiore
            </Link>
            <div className="flex gap-6">
              <Link to="/products" className="text-charcoal-700 hover:text-charcoal-900">
                Products
              </Link>
              <Link to="/cart" className="text-charcoal-700 hover:text-charcoal-900">
                Cart
              </Link>
              <Link to="/orders" className="text-charcoal-700 hover:text-charcoal-900">
                Orders
              </Link>
              <Link to="/auth/login" className="text-charcoal-700 hover:text-charcoal-900">
                Login
              </Link>
            </div>
          </nav>
        </Container>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-charcoal-900 text-beige-100 mt-auto">
        <Container>
          <div className="py-12">
            <div className="text-center">
              <h3 className="text-xl font-heading mb-4">Dolce Fiore</h3>
              <p className="text-beige-300 text-sm">
                Premium, handcrafted gift hampers rooted in health, sustainability, and conscious living.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}

