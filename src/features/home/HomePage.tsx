import { Container } from '../../components/Container'
import { Button } from '../../components/Button'
import { SectionTitle } from '../../components/SectionTitle'
import { Card } from '../../components/Card'
import { Badge } from '../../components/Badge'
import { Link } from 'react-router-dom'
import { useProducts } from '../../lib/hooks/useProducts'

export function HomePage() {
  const { data: products } = useProducts()
  
  // Filter products for different sections
  const featuredHampers = products?.filter((p) => p.category === 'HAMPER').slice(0, 3) || []
  const healthyIndulgences = products?.filter((p) => 
    p.tags.includes('sugar-free') || p.tags.includes('guilt-free')
  ).slice(0, 3) || []
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-screen max-h-[900px] overflow-hidden">
        {/* Hero Image from Unsplash */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=80&auto=format&fit=crop"
            alt="Premium artisanal gift hampers with organic treats"
            className="w-full h-full object-cover"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-charcoal-900 bg-opacity-30"></div>
        </div>

        {/* Hero Content */}
        <Container>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading text-white mb-4 sm:mb-6 leading-tight">
                Handcrafted, Sustainable,
                <br />
                <span className="text-gold-300">Guilt-Free Gifting</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-beige-100 mb-8 sm:mb-10 leading-relaxed">
                Premium gift hampers featuring organic, guilt-free treats, air-fried
                savories, and sugar-free chocolates — all wrapped in eco-friendly,
                reusable packaging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Explore Hampers
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="secondary" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Hampers */}
      <Container>
        <div className="py-16 sm:py-24">
          <SectionTitle
            title="Featured Hampers"
            subtitle="Curated collections of premium, sustainable treats"
            align="center"
          />
          {featuredHampers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHampers.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}`}>
                  <Card
                    imageUrl={product.images[0]}
                    imageAlt={product.name}
                    hoverable
                    className="h-full flex flex-col"
                  >
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            label={tag}
                            type={
                              tag === 'organic'
                                ? 'organic'
                                : tag === 'eco-friendly'
                                  ? 'eco-friendly'
                                  : tag === 'sugar-free'
                                    ? 'sugar-free'
                                    : tag === 'artisan'
                                      ? 'artisan'
                                      : 'custom'
                            }
                          />
                        ))}
                      </div>
                      <h3 className="text-xl font-heading text-charcoal-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-charcoal-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-beige-200">
                      <span className="text-2xl font-heading text-charcoal-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-charcoal-600 mb-12">
              Discover our handcrafted selection coming soon...
            </p>
          )}
        </div>

        <div className="py-16 sm:py-24 bg-beige-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Healthy Indulgences"
            subtitle="Sugar-free, organic, and guilt-free treats that delight"
            align="center"
          />
          {healthyIndulgences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthyIndulgences.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}`}>
                  <Card
                    imageUrl={product.images[0]}
                    imageAlt={product.name}
                    hoverable
                    className="h-full flex flex-col"
                  >
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            label={tag}
                            type={
                              tag === 'organic'
                                ? 'organic'
                                : tag === 'eco-friendly'
                                  ? 'eco-friendly'
                                  : tag === 'sugar-free'
                                    ? 'sugar-free'
                                    : tag === 'artisan'
                                      ? 'artisan'
                                      : 'custom'
                            }
                          />
                        ))}
                      </div>
                      <h3 className="text-xl font-heading text-charcoal-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-charcoal-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-beige-200">
                      <span className="text-2xl font-heading text-charcoal-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-charcoal-600 mb-12">
              Our curated selection coming soon...
            </p>
          )}
        </div>

        <div className="py-16 sm:py-24">
          <SectionTitle
            title="Sustainable Gifting"
            subtitle="Eco-friendly packaging that's as thoughtful as our treats"
            align="center"
          />
          <p className="text-center text-charcoal-600 mb-12">
            Learn more about our sustainable practices...
          </p>
        </div>

        {/* Dolce Fiore Story */}
        <div className="py-16 sm:py-24 bg-beige-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-none">
          <SectionTitle
            title="Our Story"
            align="center"
          />
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed mb-6">
              Dolce Fiore began as a homegrown venture with a simple dream — to craft
              thoughtful, sustainable gifting experiences. What started four years ago with
              a passion for healthy indulgence has grown into a celebration of creativity
              and conscious living.
            </p>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
              We proudly partner with local artisans across India, bringing tradition and
              sustainability into every creation. Every hamper is handcrafted with care,
              featuring organic ingredients, air-fried savories, and sugar-free chocolates —
              all wrapped in eco-friendly, reusable packaging.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

