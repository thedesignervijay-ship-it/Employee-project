// Main Application Component
// Handles navigation between Work Modes and Employees pages
// Simple tab-based navigation without React Router

import { useState } from "react";
import WorkModes from "./pages/WorkModes.tsx";
import Employees from "./pages/Employees.tsx";

// Page type for navigation state
type Page = "work-modes" | "employees";

function App() {
  // Track which page is currently active
  const [page, setPage] = useState<Page>("work-modes");

  return (
    <div className="app-container">
      <header className="page-header">
        <h1 className="page-title">Employee Salary Management</h1>
      </header>
      
      {/* Navigation tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${page === "work-modes" ? "active" : ""}`}
          onClick={() => setPage("work-modes")}
        >
          Work Modes
        </button>
        <button
          className={`nav-tab ${page === "employees" ? "active" : ""}`}
          onClick={() => setPage("employees")}
        >
          Employees
        </button>
      </nav>
      
      {/* Render active page component */}
      {page === "work-modes" ? <WorkModes /> : <Employees />}
    </div>
  );
}

export default App;
