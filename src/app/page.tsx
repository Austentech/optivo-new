'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/optivo/Navbar';
import Footer from '@/components/optivo/Footer';
import WhatsAppFloat from '@/components/optivo/WhatsAppFloat';
import EngagementPopup from '@/components/optivo/EngagementPopup';
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

import AdminLogin from '@/components/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLeadsTable from '@/components/admin/AdminLeadsTable';
import AdminChangePassword from '@/components/admin/AdminChangePassword';

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
  // adminAuthed: true = authed, false = not authed, undefined = checking
  const [adminAuthed, setAdminAuthed] = useState<boolean | undefined>(undefined);

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

  // Check admin auth when entering admin mode (except login page)
  useEffect(() => {
    if (pageState.admin && pageState.adminTab !== 'admin-login') {
      // Only re-check if not already confirmed
      if (adminAuthed !== true) {
        fetch('/api/admin/auth/me')
          .then((res) => {
            if (res.ok) {
              setAdminAuthed(true);
            } else {
              setPageState({ page: 'home', admin: true, adminTab: 'admin-login' });
            }
          })
          .catch(() => {
            setPageState({ page: 'home', admin: true, adminTab: 'admin-login' });
          });
      }
    }
  }, [pageState.admin, pageState.adminTab, adminAuthed]);

  // Update page title on navigation
  useEffect(() => {
    if (pageState.admin) {
      document.title = 'Admin CRM — Optivo Solutions';
      return;
    }
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

  // Admin navigation helpers
  const handleAdminTabChange = useCallback((tab: string) => {
    setPageState({ page: 'home', admin: true, adminTab: tab });
  }, []);

  const handleAdminLogin = useCallback(() => {
    setAdminAuthed(true);
    setPageState({ page: 'home', admin: true, adminTab: 'admin-dashboard' });
  }, []);

  const handleAdminLogout = useCallback(() => {
    setAdminAuthed(undefined);
    setPageState({ page: 'home' });
  }, []);

  const handleAdminBack = useCallback(() => {
    setPageState({ page: 'home' });
  }, []);

  const currentPage = pageState.page;

  // ── Admin render ──
  if (pageState.admin) {
    // Login page
    if (pageState.adminTab === 'admin-login') {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="admin-login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminLogin onLogin={handleAdminLogin} onBack={handleAdminBack} />
          </motion.div>
        </AnimatePresence>
      );
    }

    // Auth-protected pages — checking
    if (adminAuthed === undefined) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      );
    }

    // Not authenticated (should have been redirected, but just in case)
    if (adminAuthed === false) {
      return null;
    }

    const renderAdminContent = () => {
      switch (pageState.adminTab) {
        case 'admin-dashboard':
          return <AdminDashboard onNavigate={handleAdminTabChange} />;
        case 'admin-new-leads':
          return (
            <AdminLeadsTable
              title="New Leads"
              subtitle="All unread leads across all types"
              type="all"
              showNewOnly
            />
          );
        case 'admin-callback-leads':
          return (
            <AdminLeadsTable
              title="Callback Leads"
              subtitle="All callback requests"
              type="callback"
            />
          );
        case 'admin-enquiry-leads':
          return (
            <AdminLeadsTable
              title="Enquiry Leads"
              subtitle="All enquiry submissions"
              type="enquiry"
            />
          );
        case 'admin-change-password':
          return <AdminChangePassword />;
        default:
          return <AdminDashboard onNavigate={handleAdminTabChange} />;
      }
    };

    return (
      <AdminLayout
        activeTab={pageState.adminTab ?? 'admin-dashboard'}
        onTabChange={handleAdminTabChange}
        onLogout={handleAdminLogout}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pageState.adminTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {renderAdminContent()}
          </motion.div>
        </AnimatePresence>
      </AdminLayout>
    );
  }

  // ── Normal website render ──
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
      <EngagementPopup />
    </div>
  );
}