import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { ScrollProgress } from '../components/ScrollProgress';

export const RootLayout: React.FC = () => {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-studio-text select-none font-geist">
      <ScrollProgress />
      <CustomCursor />
      {!isHome && <Navbar />}
      <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-24'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
