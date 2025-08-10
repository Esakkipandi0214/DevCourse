import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CourseProvider } from "@/contexts/CourseContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CurriculumPage from "./pages/CurriculumPage";
import WhyChooseUsPage from "./pages/WhyChooseUsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TrainerPage from "./pages/TrainerPage";
import AuthPage from "./pages/AuthPage";
import PaymentPage from "./pages/PaymentPage";
import DashboardPage from "./pages/DashboardPage";
import Courses from "./pages/Courses";
import CourseListPage from "./pages/AdminCourse";
import CalendarPage from "./pages/CourseTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CourseProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/Courses/TrackCourse" element={<CalendarPage />} />
            <Route path="/admin/courses" element={<CourseListPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/trainer" element={<TrainerPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* <Route path="/payment" element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } /> */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
      </CourseProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
