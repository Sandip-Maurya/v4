import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container } from './Container'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Mock cart count - will be replaced with actual cart state later
  const cartItemCount = 0

  const navLinks = [
    { to: '/products', label: 'Products' },
    { to: '/orders', label: 'Orders' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-beige-200 sticky top-0 z-40">
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-heading text-charcoal-900 hover:text-charcoal-700 transition-colors"
            >
              Dolce Fiore
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm lg:text-base font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-charcoal-900 border-b-2 border-charcoal-900'
                      : 'text-charcoal-600 hover:text-charcoal-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Cart Icon with Badge */}
              <Link
                to="/cart"
                className="relative text-charcoal-600 hover:text-charcoal-900 transition-colors"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Login Link */}
              <Link
                to="/auth/login"
                className={`text-sm lg:text-base font-medium transition-colors ${
                  isActive('/auth/login')
                    ? 'text-charcoal-900 border-b-2 border-charcoal-900'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Cart Icon for Mobile */}
              <Link
                to="/cart"
                className="relative text-charcoal-600 hover:text-charcoal-900 transition-colors"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-charcoal-600 hover:text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-500 rounded p-1"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-beige-200 py-4 animate-in slide-in-from-top duration-200">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-2 ${
                      isActive(link.to)
                        ? 'text-charcoal-900 border-l-4 border-charcoal-900 pl-4'
                        : 'text-charcoal-600 hover:text-charcoal-900 pl-4'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors py-2 ${
                    isActive('/auth/login')
                      ? 'text-charcoal-900 border-l-4 border-charcoal-900 pl-4'
                      : 'text-charcoal-600 hover:text-charcoal-900 pl-4'
                  }`}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </Container>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-charcoal-900 text-beige-100 mt-auto">
        <Container>
          <div className="py-12 sm:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand Story */}
              <div className="lg:col-span-2">
                <h3 className="text-xl sm:text-2xl font-heading mb-4">Dolce Fiore</h3>
                <p className="text-sm sm:text-base text-beige-300 leading-relaxed mb-4 max-w-md">
                  At Dolce Fiore, we create premium, handcrafted gift hampers rooted in
                  health, sustainability, and conscious living. Every product is designed to
                  delight while leaving a positive impact — on people and the planet.
                </p>
                <p className="text-sm text-beige-400">
                  Handcrafted with care since 2020.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-base font-heading mb-4 text-beige-50">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="/products"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-base font-heading mb-4 text-beige-50">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-beige-300 hover:text-beige-50 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 pt-8 border-t border-charcoal-800 text-center">
              <p className="text-sm text-beige-400">
                © {new Date().getFullYear()} Dolce Fiore. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}

