'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const PageTransitionBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setVisible(true);
    setProgress(75);
    const t1 = setTimeout(() => setProgress(100), 120);
    const t2 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 340);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  useEffect(() => {
    const prefetched = new Set<string>();

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (prefetched.has(href)) return;
      prefetched.add(href);
      try {
        router.prefetch(href);
      } catch {
        // ignore prefetch error
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (target.getAttribute('target') === '_blank') return;

      const cleanTarget = href.split('?')[0].split('#')[0];
      if (cleanTarget !== pathname) {
        setVisible(true);
        setProgress(45);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, router]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9999] h-[2.5px] overflow-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-[#D91B24] via-[#E11D48] to-[#004A8F] shadow-[0_0_10px_#D91B24] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
};
