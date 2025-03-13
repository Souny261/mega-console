import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import InventoryMonitoring from "./pages/InventoryMonitoring";
import ActivityLogs from "./pages/ActivityLogs";
import SystemSettings from "./pages/SystemSettings";
import CustomerSupport from "./pages/CustomerSupport";
import ProductsPage from "./components/products/ProductsPage";
import ProductFormPage from "./components/products/ProductFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Reports } from "./pages/Reports";

const queryClient = new QueryClient();

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <Router>
        <div className={`flex h-screen w-full ${darkMode ? "dark" : ""}`}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Routes>
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/new" element={<ProductFormPage />} />
                  <Route path="/products/edit/:id" element={<ProductFormPage />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/subscriptions" element={<SubscriptionManagement />} />
                  <Route path="/inventory" element={<InventoryMonitoring />} />
                  <Route path="/logs" element={<ActivityLogs />} />
                  <Route path="/settings" element={<SystemSettings />} />
                  <Route path="/support" element={<CustomerSupport />} />
                  <Route path="/report" element={<Reports />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
