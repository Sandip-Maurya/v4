import { useParams, Link } from 'react-router-dom'
import { Container } from '../../components/Container'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { useProduct } from '../../lib/hooks/useProducts'
import { useAddToCart } from '../../lib/hooks/useCart'
import { useState } from 'react'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { data: product, isLoading, error } = useProduct(slug || '')
  const addToCartMutation = useAddToCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (isLoading) {
    return (
      <Container>
        <div className="py-12">
          <div className="text-center text-charcoal-600">Loading product...</div>
        </div>
      </Container>
    )
  }

  if (error || !product) {
    return (
      <Container>
        <div className="py-12">
          <div className="text-center text-red-600 mb-4">Product not found</div>
          <Link to="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </Container>
    )
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          alert('Product added to cart!')
        },
      }
    )
  }

  return (
    <Container>
      <div className="py-12">
        <Link
          to="/products"
          className="text-charcoal-600 hover:text-charcoal-900 mb-6 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-beige-100 mb-4">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-charcoal-900'
                        : 'border-beige-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
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

            <h1 className="text-4xl lg:text-5xl font-heading text-charcoal-900 mb-4">
              {product.name}
            </h1>

            <div className="text-3xl font-heading text-charcoal-900 mb-6">
              ₹{product.price.toLocaleString()}
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-base text-charcoal-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {product.weight_grams && (
              <div className="text-sm text-charcoal-600 mb-6">
                Weight: {product.weight_grams}g
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="primary"
                onClick={handleAddToCart}
                isLoading={addToCartMutation.isPending}
                disabled={!product.is_available}
                className="flex-1"
              >
                {product.is_available ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

