'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/optivo/Navbar';
import Footer from '@/components/optivo/Footer';
import WhatsAppFloat from '@/components/optivo/WhatsAppFloat';
import type { PageKey, NavigateState } from '@/components/optivo/Navbar';
import { getService } from '@/data/services';

import HomePage from '@/components/optivo/pages/HomePage';
import AboutPage from '@/components/optivo/pages/AboutPage';
import ServicesPage from '@/components/optivo/pages/ServicesPage';
import ServiceDetailPage from '@/components/optivo/pages/ServiceDetailPage';
import ContactPage from '@/components/optivo/pages/ContactPage';
import CareerPage from '@/components/optivo/pages/CareerPage';
import BlogPage from '@/components/optivo/pages/BlogPage';
import SuccessPage from '@/components/optivo/pages/SuccessPage';
import FAQsPage from '@/components/optivo/pages/FAQsPage';

const PAGE_TITLES: Record<PageKey, string> = {
  home: 'Optivo Solutions — Performance-Driven Digital Marketing Agency',
  about: 'About Us — Optivo Solutions | Digital Marketing Agency',
  services: 'Our Services — Optivo Solutions | Digital Marketing Agency',
  'service-detail': '',
  success: 'Success Stories — Optivo Solutions | Digital Marketing Agency',
  blog: 'Blog — Optivo Solutions | Digital Marketing Agency',
  contact: 'Contact Us — Optivo Solutions | Digital Marketing Agency',
  career: 'Career — Optivo Solutions | Join Our Team',
  faqs: 'FAQs — Optivo Solutions | Digital Marketing Agency',
};

export default function OptivoApp() {
  const [pageState, setPageState] = useState<NavigateState>({ page: 'home' });

  const handleNavigate = useCallback((state: NavigateState) => {
    setPageState(state);
  }, []);

  // Listen for custom events from CTASection and other standalone components
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.page) {
        handleNavigate(detail);
      }
    };
    window.addEventListener('optivo-navigate', handler);
    return () => window.removeEventListener('optivo-navigate', handler);
  }, [handleNavigate]);

  // Update page title on navigation
  useEffect(() => {
    const page = pageState.page;
    let title = PAGE_TITLES[page] || 'Optivo Solutions';
    if (page === 'service-detail' && pageState.serviceSlug) {
      const svc = getService(pageState.serviceSlug);
      title = svc
        ? `${svc.title} — Optivo Solutions | Digital Marketing Agency`
        : 'Service — Optivo Solutions';
    }
    document.title = title;
  }, [pageState]);

  const currentPage = pageState.page;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'service-detail':
        return <ServiceDetailPage slug={pageState.serviceSlug ?? ''} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'career':
        return <CareerPage />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'success':
        return <SuccessPage />;
      case 'faqs':
        return <FAQsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const pageKey = currentPage === 'service-detail'
    ? `service-detail-${pageState.serviceSlug}`
    : currentPage;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} />
      <WhatsAppFloat />
    </div>
  );
}