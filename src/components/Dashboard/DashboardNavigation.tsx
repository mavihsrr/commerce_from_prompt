// src/components/Dashboard/DashboardNavigation.tsx
import React from 'react';
import { Package, ShoppingCart, Users, BarChart, Warehouse, Gift, MessageSquare, LucideIcon } from 'lucide-react';
import { DashboardSection } from '../../types/dashboard'; // Import the type

interface DashboardNavigationProps {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
}

/**
 * Sidebar navigation component for the Creator Dashboard.
 * Allows users to switch between different dashboard sections.
 */
const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ activeSection, setActiveSection }) => {
  // Define navigation items with their IDs, labels, and Lucide icons
  const navItems: { id: DashboardSection; label: string; icon: LucideIcon }[] = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'inventory', label: 'Inventory Tracking', icon: Warehouse },
    { id: 'promotions', label: 'Promotional Campaigns', icon: Gift },
    { id: 'communication', label: 'Customer Communication', icon: MessageSquare },
  ];

  return (
    <nav className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-shrink-0">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">Navigation</h2>
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon; // Get the Lucide icon component
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center p-3 rounded-md text-base font-medium transition-colors duration-200
                  ${activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" /> {/* Render the icon */}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardNavigation;
