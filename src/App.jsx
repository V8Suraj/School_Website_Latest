import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/admin/AdminLayout";

// Main Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Notices from "./pages/Notices";
import Fees from "./pages/Fees";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAnnouncements from "./pages/admin/Announcements";
import AdminCalendarEvents from "./pages/admin/CalendarEvents";
import AdminAbout from "./pages/admin/About";
import AdminAcademics from "./pages/admin/Academics";
import AdminAdmissions from "./pages/admin/Admissions";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminNotices from "./pages/admin/Notices";
import AdminFees from "./pages/admin/Fees";
import AdminGallery from "./pages/admin/Gallery";
import AdminCircular from "./pages/admin/Circular";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* Main Website */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/fees" element={<Fees />} />
            </Route>

            {/* Admin Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            {/* Admin Panel */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin/announcements"
                element={<AdminAnnouncements />}
              />
              <Route
                path="/admin/calendar"
                element={<AdminCalendarEvents />}
              />
              <Route path="/admin/about" element={<AdminAbout />} />
              <Route path="/admin/academics" element={<AdminAcademics />} />
              <Route path="/admin/admissions" element={<AdminAdmissions />} />
              <Route path="/admin/inquiries" element={<AdminInquiries />} />
              <Route path="/admin/notices" element={<AdminNotices />} />
              <Route path="/admin/fees" element={<AdminFees />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/circular" element={<AdminCircular />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;