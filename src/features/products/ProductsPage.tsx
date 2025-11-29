import { useState, useMemo } from 'react'
import { Container } from '../../components/Container'
import { SectionTitle } from '../../components/SectionTitle'
import { Card } from '../../components/Card'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { useProducts } from '../../lib/hooks/useProducts'
import type { Product } from '../../lib/api/endpoints/catalog'
import { Link } from 'react-router-dom'

type SortOption = 'price-low' | 'price-high' | 'newest'

export function ProductsPage() {
  const { data: products, isLoading, error } = useProducts()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('newest')

  const categories: Product['category'][] = ['COOKIE', 'SNACK', 'CAKE', 'SWEET', 'HAMPER']
  const availableTags = ['organic', 'sugar-free', 'eco-friendly', 'artisan', 'guilt-free']

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return []

    let filtered = products.filter((product) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Tag filter (product must have at least one selected tag)
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some((tag) => product.tags.includes(tag))
        if (!hasSelectedTag) return false
      }

      return true
    })

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          // Sort by ID (higher ID = newer in mock data)
          return parseInt(b.id) - parseInt(a.id)
        default:
          return 0
      }
    })

    return filtered
  }, [products, selectedCategories, selectedTags, sortOption])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSortOption('newest')
  }

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

        {/* Filters and Sorting */}
        <div className="mt-8 mb-8 space-y-6">
          {/* Category Filters */}
          <div>
            <h3 className="text-sm font-medium text-charcoal-700 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-charcoal-900 text-beige-50'
                      : 'bg-beige-100 text-charcoal-700 hover:bg-beige-200'
                  }`}
                >
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          <div>
            <h3 className="text-sm font-medium text-charcoal-700 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-charcoal-900 text-beige-50'
                      : 'bg-beige-100 text-charcoal-700 hover:bg-beige-200'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and Clear */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-charcoal-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-4 py-2 rounded-lg border border-beige-300 bg-white text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            {(selectedCategories.length > 0 || selectedTags.length > 0) && (
              <Button variant="ghost" onClick={clearFilters} className="text-sm">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {filteredAndSortedProducts.length > 0 && (
          <p className="text-sm text-charcoal-600 mb-6">
            Showing {filteredAndSortedProducts.length} of {products?.length || 0} products
          </p>
        )}

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
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
            {products && products.length > 0 ? (
              <>
                <p className="mb-4">No products match your filters.</p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </>
            ) : (
              'No products available'
            )}
          </div>
        )}
      </div>
    </Container>
  )
}

