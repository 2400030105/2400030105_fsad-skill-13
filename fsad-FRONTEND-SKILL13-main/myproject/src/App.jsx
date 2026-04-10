import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [cartRunning, setCartRunning] = useState(false);
  const location = useLocation();
  const bubbles = [
    { left: "6%", size: "54px", delay: "0s", duration: "11s", hue: "#38bdf8" },
    { left: "14%", size: "26px", delay: "1.2s", duration: "8.5s", hue: "#34d399" },
    { left: "22%", size: "38px", delay: "2.1s", duration: "10s", hue: "#60a5fa" },
    { left: "32%", size: "62px", delay: "0.7s", duration: "13s", hue: "#f59e0b" },
    { left: "41%", size: "30px", delay: "1.8s", duration: "9.2s", hue: "#22d3ee" },
    { left: "51%", size: "48px", delay: "2.4s", duration: "12.5s", hue: "#f472b6" },
    { left: "61%", size: "34px", delay: "1.1s", duration: "9.8s", hue: "#818cf8" },
    { left: "70%", size: "58px", delay: "0.4s", duration: "13.2s", hue: "#a3e635" },
    { left: "79%", size: "28px", delay: "2.7s", duration: "8.8s", hue: "#f97316" },
    { left: "88%", size: "44px", delay: "1.5s", duration: "11.4s", hue: "#2dd4bf" },
    { left: "94%", size: "24px", delay: "3s", duration: "9.6s", hue: "#fb7185" },
  ];

  const triggerRefresh = () => {
    setRefreshCount((current) => current + 1);
  };

  const triggerCartRun = () => {
    setCartRunning(false);

    requestAnimationFrame(() => {
      setCartRunning(true);
    });

    setTimeout(() => {
      setCartRunning(false);
    }, 1200);
  };

  useEffect(() => {
    if (location.pathname === "/products") {
      triggerCartRun();
    }
  }, [location.pathname]);

  return (
    <main className="app-shell">
      <div className="bubble-layer" aria-hidden="true">
        {bubbles.map((bubble, index) => (
          <span
            key={`${bubble.left}-${index}`}
            className="bubble"
            style={{
              "--left": bubble.left,
              "--size": bubble.size,
              "--delay": bubble.delay,
              "--duration": bubble.duration,
              "--hue": bubble.hue,
            }}
          />
        ))}
      </div>

      <header className="hero-header">
        <p className="hero-kicker">Spring Project</p>
        <h1>Spring Product Manager</h1>
        <p className="hero-subtitle">
          Add, track, and manage products in a smooth modern interface.
        </p>
        <div className="hero-symbols" aria-hidden="true">
          <span className="symbol-chip">+</span>
          <span className="symbol-chip">#</span>
          <span className="symbol-chip">*</span>
        </div>
      </header>

      <nav className="top-nav" aria-label="Primary">
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? "nav-pill active" : "nav-pill")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Product
        </NavLink>
        <NavLink
          to="/products"
          onClick={triggerCartRun}
          className={({ isActive }) => (isActive ? "nav-pill active" : "nav-pill")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7h14M5 12h14M5 17h14" />
          </svg>
          Cart Products
        </NavLink>
      </nav>

      <div className="cart-track-wrap" aria-hidden="true">
        <div className="cart-track">
          <div className={cartRunning ? "track-cart run" : "track-cart"}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 5h2l2 10h9l2-7H7" />
              <circle cx="10" cy="19" r="1.8" />
              <circle cx="17" cy="19" r="1.8" />
            </svg>
          </div>
        </div>
      </div>

      <section className="page-shell">
        <Routes>
          <Route
            path="/add"
            element={
              <div className="page-pane">
                <AddProduct onProductAdded={triggerRefresh} />
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <div className="page-pane">
                <ProductList refreshTrigger={refreshCount} />
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/add" replace />} />
        </Routes>
      </section>

      <footer className="news-footer" aria-label="headline ticker">
        <div className="news-track">
          <p>KL UNIVERSITY 2028</p>
          <p aria-hidden="true">KL UNIVERSITY 2028</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
