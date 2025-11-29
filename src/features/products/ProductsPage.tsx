import { Container } from '../../components/Container'
import { SectionTitle } from '../../components/SectionTitle'
import { Card } from '../../components/Card'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { useProducts } from '../../lib/hooks/useProducts'
import { Link } from 'react-router-dom'

export function ProductsPage() {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <Container>
        <div className="py-12">
          <div className="text-center text-charcoal-600">Loading products...</div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="py-12">
          <div className="text-center text-red-600">Error loading products</div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-12">
        <SectionTitle
          title="Our Products"
          subtitle="Premium, handcrafted gift hampers and treats"
          align="center"
        />

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
                    <Button variant="primary" className="text-sm px-4 py-2">
                      View Details
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-charcoal-600 py-12">
            No products available
          </div>
        )}
      </div>
    </Container>
  )
}

