import { Container } from '../../components/Container'
import { SectionTitle } from '../../components/SectionTitle'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'
import { useCart } from '../../lib/hooks/useCart'
import { useRemoveFromCart } from '../../lib/hooks/useCart'
import { Link } from 'react-router-dom'

export function CartPage() {
  const { data: cart, isLoading, error } = useCart()
  const removeFromCartMutation = useRemoveFromCart()

  if (isLoading) {
    return (
      <Container>
        <div className="py-12">
          <div className="text-center text-charcoal-600">Loading cart...</div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="py-12">
          <div className="text-center text-red-600">Error loading cart</div>
        </div>
      </Container>
    )
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCartMutation.mutate(itemId)
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container>
        <div className="py-12">
          <SectionTitle title="Shopping Cart" align="center" />
          <div className="text-center py-12">
            <p className="text-charcoal-600 mb-6">Your cart is empty</p>
            <Link to="/products">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-12">
        <SectionTitle title="Shopping Cart" align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-card p-6 flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-beige-100 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.product.tags.slice(0, 2).map((tag) => (
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
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-charcoal-600 mb-4">
                      Quantity: {item.quantity}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-heading text-charcoal-900">
                        ₹{item.line_total.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removeFromCartMutation.isPending}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <h2 className="text-2xl font-heading text-charcoal-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-charcoal-700">
                  <span>Subtotal</span>
                  <span>₹{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal-700">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-beige-200 pt-4 flex justify-between text-2xl font-heading text-charcoal-900">
                  <span>Total</span>
                  <span>₹{cart.total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="block">
                <Button variant="primary" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

