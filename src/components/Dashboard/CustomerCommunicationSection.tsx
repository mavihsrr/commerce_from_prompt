// src/components/Dashboard/CustomerCommunicationSection.tsx
import React from 'react';
import Card from '../Card'; // Adjusted: Import the reusable Card component from the correct path

/**
 * Component for the "Customer Communication" tool.
 * Facilitates direct messaging and notifications to customers.
 */
const CustomerCommunicationSection: React.FC = () => (
  <Card title="Customer Communication">
    <p className="text-gray-600 mb-4">Connect directly with your customers. Send announcements, respond to inquiries, and manage notifications in one place.</p>
    {/* Placeholder for messaging interface - Actual customer communication UI */}
    <div className="bg-teal-50 border-l-4 border-teal-400 p-4 text-sm text-teal-700 rounded-md">
      Coming Soon: Integrated messaging and automated email templates.
    </div>
  </Card>
);

export default CustomerCommunicationSection;
