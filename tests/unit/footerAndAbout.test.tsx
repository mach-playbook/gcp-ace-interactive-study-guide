import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Unit Test: Footer Component Variants and Accessibility', () => {
  it('renders light variant properly with correct classnames', () => {
    const { container } = render(<Footer variant="light" />);
    const footerElem = container.querySelector('footer');
    expect(footerElem).toHaveClass('bg-white');
    expect(footerElem).toHaveClass('border-slate-200');
  });

  it('renders dark variant properly with correct classnames', () => {
    const { container } = render(<Footer variant="dark" />);
    const footerElem = container.querySelector('footer');
    expect(footerElem).toHaveClass('bg-slate-950');
    expect(footerElem).toHaveClass('border-slate-800');
  });

  it('contains valid rel attributes for external links to prevent tabnabbing security risks', () => {
    render(<Footer variant="dark" />);
    const externalLinks = screen.getAllByRole('link').filter((a) => a.getAttribute('target') === '_blank');

    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toMatch(/noopener/);
      expect(link.getAttribute('rel')).toMatch(/noreferrer/);
    });
  });

  it('verifies the author homepage URL is https://merolhack.github.io/', () => {
    render(<Footer variant="light" />);
    const links = screen.getAllByRole('link', { name: /Lenin Meza/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://merolhack.github.io/');
    });
  });
});
