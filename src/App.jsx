import React, { useEffect } from "react";
import Router from "./route";
import { setupTokenExpiryMonitoring } from "./services/api";

function App() {
  useEffect(() => {
    // Set up automatic token expiry monitoring
    const cleanup = setupTokenExpiryMonitoring();
    
    // Cleanup on component unmount
    return cleanup;
  }, []);

  return <Router />;
}

export default App
