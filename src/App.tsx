import { useState, useEffect } from 'react';
import './App.css';
import type { PageId, NavState, PressItem, WritingItem } from '@/types';
import { useContent } from '@/hooks/useContent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import WorksPage from '@/pages/WorksPage';
import SeriesPage from '@/pages/SeriesPage';
import PressPage from '@/pages/PressPage';
import WritingPage from '@/pages/WritingPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import ShopPage from '@/pages/ShopPage';
import FilmsPage from '@/pages/FilmsPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

function App() {
  const [nav, setNav] = useState<NavState>({ page: 'home' });
  const content = useContent();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [nav.page, nav.seriesId, nav.itemId]);

  const handleNavigate = (page: PageId) => {
    setNav({ page });
  };

  const handleSeriesClick = (seriesId: string) => {
    setNav({ page: 'works', seriesId });
  };

  const handleBackToWorks = () => {
    setNav({ page: 'works' });
  };

  const handlePressItemClick = (item: PressItem) => {
    setNav({ page: 'pressDetail', itemId: item.id });
  };

  const handleWritingItemClick = (item: WritingItem) => {
    setNav({ page: 'writingDetail', itemId: item.id });
  };

  const handleBackToPress = () => {
    setNav({ page: 'press' });
  };

  const handleBackToWriting = () => {
    setNav({ page: 'writing' });
  };

  const currentSeries = nav.seriesId
    ? content.series.find((s) => s.id === nav.seriesId)
    : null;

  const currentPressItem = nav.itemId && nav.page === 'pressDetail'
    ? content.pressItems.find((p) => p.id === nav.itemId)
    : null;

  const currentWritingItem = nav.itemId && nav.page === 'writingDetail'
    ? content.writingItems.find((w) => w.id === nav.itemId)
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

    // Press detail page
    if (nav.page === 'pressDetail' && currentPressItem) {
      return (
        <ArticleDetailPage
          key={currentPressItem.id}
          article={currentPressItem}
          backLabel="返回媒体"
          onBack={handleBackToPress}
        />
      );
    }

    // Writing detail page
    if (nav.page === 'writingDetail' && currentWritingItem) {
      return (
        <ArticleDetailPage
          key={currentWritingItem.id}
          article={currentWritingItem}
          backLabel="返回写作"
          onBack={handleBackToWriting}
        />
      );
    }

    switch (nav.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSeriesClick={handleSeriesClick} />;
      case 'works':
        return <WorksPage onSeriesClick={handleSeriesClick} />;
      case 'films':
        return <FilmsPage />;
      case 'press':
        return <PressPage onItemClick={handlePressItemClick} />;
      case 'writing':
        return <WritingPage onItemClick={handleWritingItemClick} />;
      case 'shop':
        return <ShopPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onSeriesClick={handleSeriesClick} />;
    }
  };

  // Hide header/footer on homepage for a cleaner look
  const isHome = nav.page === 'home' && !nav.seriesId;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isHome && <Header currentPage={nav.page} onNavigate={handleNavigate} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isHome && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
