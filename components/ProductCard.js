import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow">
      <Image
        src={product.image}
        alt={product.title}
        width={500}
        height={500}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white p-2 mt-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
