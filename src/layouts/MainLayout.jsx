import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { HelmetProvider } from "react-helmet-async";

const MainLayout = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        {/* Toast Notifications */}
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />

        {/* Navbar */}
        <nav className="sticky top-0 z-50">
          <Navbar />
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-base-300 text-base-content">
          <Footer />
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default MainLayout;
