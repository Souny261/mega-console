import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppContent from './components/layout/AppContent';
export function App() {
  return <AuthProvider>
      <AppContent />
    </AuthProvider>;
}