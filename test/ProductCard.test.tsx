import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../src/components/ProductCard';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
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
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });

  it('renders fallback image when images array is empty', () => {
    const productWithNoImages = { ...mockProduct, images: [] };
    render(<ProductCard product={productWithNoImages} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://placehold.co/600x400');
  });

  it('handles malformed image URLs', () => {
    const productWithBadImage = {
      ...mockProduct,
      images: ['["https://example.com/image.jpg"]'],
    };
    render(<ProductCard product={productWithBadImage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});
