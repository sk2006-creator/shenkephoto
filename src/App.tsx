import { useState, useEffect } from 'react';
import './App.css';
import type { PageId, NavState } from '@/types';
import { series } from '@/data/artist';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WorksPage from '@/pages/WorksPage';
import SeriesPage from '@/pages/SeriesPage';
import PressPage from '@/pages/PressPage';
import ShopPage from '@/pages/ShopPage';
import FilmsPage from '@/pages/FilmsPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

function App() {
  const [nav, setNav] = useState<NavState>({ page: 'works' });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [nav.page, nav.seriesId]);

  const handleNavigate = (page: PageId) => {
    setNav({ page });
  };

  const handleSeriesClick = (seriesId: string) => {
    setNav({ page: 'works', seriesId });
  };

  const handleBackToWorks = () => {
    setNav({ page: 'works' });
  };

  const currentSeries = nav.seriesId
    ? series.find((s) => s.id === nav.seriesId)
    : null;

  const renderPage = () => {
    // If we're on works page and a series is selected, show the series page
    if (nav.page === 'works' && currentSeries) {
      return (
        <SeriesPage
          key={currentSeries.id}
          seriesData={currentSeries}
          onBack={handleBackToWorks}
        />
      );
    }

    switch (nav.page) {
      case 'works':
        return <WorksPage onSeriesClick={handleSeriesClick} />;
      case 'press':
        return <PressPage />;
      case 'shop':
        return <ShopPage />;
      case 'films':
        return <FilmsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <WorksPage onSeriesClick={handleSeriesClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header currentPage={nav.page} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
