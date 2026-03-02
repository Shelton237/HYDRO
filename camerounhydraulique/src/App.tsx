import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ROUTE_PATHS } from "@/lib/index";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Sectors from "@/pages/Sectors";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminProducts from "@/pages/AdminProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionConfig reducedMotion="user">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={ROUTE_PATHS.HOME} element={<Home />} />
              <Route path={ROUTE_PATHS.SERVICES} element={<Services />} />
              <Route path={ROUTE_PATHS.SERVICE_DETAIL} element={<ServiceDetail />} />
              <Route path={ROUTE_PATHS.SECTORS} element={<Sectors />} />
              <Route path={ROUTE_PATHS.PRODUCTS} element={<Products />} />
              <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
              <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
              <Route path={ROUTE_PATHS.ADMIN_PRODUCTS} element={<AdminProducts />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
