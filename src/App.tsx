import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ScrollProgressBar } from "./components/shared/ScrollProgressBar.tsx";

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reading progress indicator */}
      <ScrollProgressBar />

      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}