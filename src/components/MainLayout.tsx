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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
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

              {/* Social Media */}
              <div>
                <h4 className="text-base font-heading mb-4 text-beige-50">Social Media</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-beige-300 hover:text-beige-50 transition-colors group"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                      <span className="text-sm">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-beige-300 hover:text-beige-50 transition-colors group"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-beige-300 hover:text-beige-50 transition-colors group"
                      aria-label="YouTube"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="text-sm">YouTube</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-beige-300 hover:text-beige-50 transition-colors group"
                      aria-label="X (Twitter)"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-sm">X</span>
                    </a>
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

