'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';  // Import Link for navigation
// import Ebanner from '../public/Ebanner.jpg'
export default function Page() {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Fixed Top Navigation Bar */}
      <nav className="bg-blue-600 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4 text-white">
        <div className="text-2xl font-bold">
            <Image
              src="/logo.png"  
              alt="Arch E-commerce Logo"
              width={150}  
              height={50}  
            />
          </div>
          <div className="flex flex-grow mx-4">
            <input
              type="text"
              placeholder="Search for products"
              className="p-2 rounded w-full"
            />
          </div>
          <div className="text-lg">
          <Link href="/cart" className="flex items-center">
  <span>Cart ({getCartCount()})</span>
  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h1l1.5 4.5L7 9h10l1.5-1.5L19 3h1m-6 0h6v18H3V3h6m0 0H3m12 0h6M7 12v6m0-6l-3 3m3-3l3 3" />
  </svg>
</Link>

          </div>
        </div>
      </nav>

      {/* Banner Section */}
      <section className="container mx-auto mt-16 pt-4">
        <div className="relative">
          <Image
            src="/Ebanner.jpg"
            alt="Banner"
            layout="responsive"
            width={500}
            height={100}
            objectFit="cover"
          />
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-4">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-8 text-white mt-8">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    
    {/* Customer Service Section */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Contact Us</a></li>
        <li><a href="#" className="hover:underline">Help Center</a></li>
        <li><a href="#" className="hover:underline">Return Policy</a></li>
        <li><a href="#" className="hover:underline">Track Order</a></li>
      </ul>
    </div>
    
    {/* Company Section */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Company</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">About Us</a></li>
        <li><a href="#" className="hover:underline">Careers</a></li>
        <li><a href="#" className="hover:underline">Press Releases</a></li>
        <li><a href="#" className="hover:underline">Corporate Information</a></li>
      </ul>
    </div>
    
    {/* Policies Section */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Policies</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
        <li><a href="#" className="hover:underline">Terms of Service</a></li>
        <li><a href="#" className="hover:underline">Security</a></li>
        <li><a href="#" className="hover:underline">Sitemap</a></li>
      </ul>
    </div>
    
    {/* Follow Us Section */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Facebook</a></li>
        <li><a href="#" className="hover:underline">Twitter</a></li>
        <li><a href="#" className="hover:underline">Instagram</a></li>
        <li><a href="#" className="hover:underline">LinkedIn</a></li>
      </ul>
    </div>
    
    {/* Newsletter Section */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Stay Informed</h4>
      <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
      <form>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="p-2 rounded bg-gray-700 text-white w-full mb-4"
        />
        <button 
          type="submit" 
          className="bg-blue-500 p-2 rounded w-full hover:bg-blue-600 transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  {/* Bottom Footer */}
  <div className="bg-gray-900 p-4 mt-8 text-center">
    <div className="container mx-auto">
      <p>&copy; 2024 Arch E-commerce. All rights reserved.</p>
      <p className="text-sm mt-2">Terms & Conditions | Privacy Policy | Sitemap</p>
    </div>
  </div>
</footer>

    </main>
  );
}
