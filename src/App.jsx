import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import UpperNavber from "./components/header/UpperNavber";

function App() {
  return (
    <>
      <div className="relative">
        <UpperNavber />
        <Navbar />
        <Outlet />
        <Footer />
        <Toaster
          toastOptions={{
            duration: 50000,
            classNames: {
              error: "bg-secondary",
              info: "bg-blue-400",
              success: "bg-primary",
              warning: "bg-orange-400",
              title: "text-gray-700 text-xl",
              description: "text-white",
              actionButton: "bg-secondary",
              cancelButton: "bg-orange-400",
              closeButton: "bg-lime-400",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
