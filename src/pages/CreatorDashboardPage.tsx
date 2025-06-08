// src/pages/CreatorDashboardPage.tsx
import React, { useState } from 'react';
import {
  AnalyticsSection,
  CustomerCommunicationSection,
  CustomersSection,
  DashboardNavigation,
  InventoryTrackingSection,
  OrdersSection,
  ProductsSection,
  PromotionalCampaignsSection,
} from '../components/Dashboard'; // Corrected: Import from index file without extension
import { DashboardSection } from '../types/dashboard'; // Import the DashboardSection type

/**
 * The main page component for the Creator Dashboard.
 * Manages the active section state and renders the appropriate content.
 */
const CreatorDashboardPage: React.FC = () => {
  // State to manage which dashboard section is currently active
  const [activeSection, setActiveSection] = useState<DashboardSection>('products');

  /**
   * Renders the currently active dashboard section component based on `activeSection` state.
   */
  const renderSection = () => {
    switch (activeSection) {
      case 'products':
        return <ProductsSection />;
      case 'orders':
        return <OrdersSection />;
      case 'customers':
        return <CustomersSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'inventory':
        return <InventoryTrackingSection />;
      case 'promotions':
        return <PromotionalCampaignsSection />;
      case 'communication':
        return <CustomerCommunicationSection />;
      default:
        return <ProductsSection />; // Default to products if an unknown section is active
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[Inter]">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Creator Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm">Welcome, Creator!</span>
          </div>
        </div>
      </header>

      {/* Main Content Area: Sidebar Navigation + Dynamic Section Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation - Passes active section and setter function */}
        <DashboardNavigation activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Dynamic Content Area - Renders the selected section */}
        <section className="flex-grow space-y-8">
          {renderSection()}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Creator Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CreatorDashboardPage;
