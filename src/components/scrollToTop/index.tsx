'use client'; // Only needed in app directory (Next.js 13+ with app router)

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeout); // Cleanup
  }, [pathname]);

  return null;
}
