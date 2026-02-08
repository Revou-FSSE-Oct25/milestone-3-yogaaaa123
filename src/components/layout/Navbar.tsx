'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import { ShoppingCart, User, LogOut, X, Search } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/products', label: 'Produk' },
  { href: '/about', label: 'Tentang' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Live search dengan debounce (500ms)
  useEffect(() => {
    // Hanya aktif di halaman beranda
    if (pathname !== '/') return;

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        router.replace(`/?search=${encodeURIComponent(searchQuery)}`, { scroll: false });
      } else {
        // Clear search jika input kosong
        router.replace('/', { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname, router]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                aria-label="Open menu"
              >
                <Image 
                  src="/dot-pending.svg" 
                  alt="Menu" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6" // Removed invert to show original color (likely dark)
                />
              </button>
              
              <Link href="/" className="shrink-0 flex items-center">
                <span className="text-xl font-bold text-rose-600">Hello Shop</span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center ml-6 space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari di Hello Shop"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-100 focus:border-rose-500 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-rose-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Right: Cart, User */}
            <div className="flex items-center space-x-2">
              <Link href="/cart" className="p-2 text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-lg relative">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-rose-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isLoading ? (
                <Loader className="w-8 h-8" />
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="hidden md:block text-gray-600 hover:text-rose-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                  )}

                  <div className="flex items-center space-x-2">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-gray-200"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-rose-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Keluar"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-rose-600">Menu</span>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-400">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <nav className="p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsDrawerOpen(false)}
              className="block py-3 px-4 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setIsDrawerOpen(false)}
              className="block py-3 px-4 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium transition-colors"
            >
              Dashboard Admin
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
