import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default MainLayout;
