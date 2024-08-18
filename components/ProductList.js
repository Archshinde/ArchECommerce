import ProductCard from './ProductCard';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No products found matching your search criteria.</p>
      )}
    </div>
  );
}
