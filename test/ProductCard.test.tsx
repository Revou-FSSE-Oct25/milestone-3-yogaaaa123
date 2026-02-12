import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../src/components/ProductCard';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock CartContext
const mockAddToCart = vi.fn();
vi.mock('../src/context/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'A great product',
    category: { id: 1, name: 'Electronics', image: '' },
    images: ['https://example.com/image.jpg'],
  };

  it('renders product title', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product price formatted', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('renders product category', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    const links = screen.getAllByRole('link');
    // Check if at least one link points to the product detail
    const productLink = links.find(link => link.getAttribute('href') === '/product/1');
    expect(productLink).toBeInTheDocument();
  });

  it('renders fallback image when images array is empty', () => {
    const productWithNoImages = { ...mockProduct, images: [] };
    render(<ProductCard product={productWithNoImages} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://placehold.co/600x400');
  });
});
