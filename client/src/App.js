import React from "react";
import Router from "./routes/router";
import AdminCollapseProvider from "./context/AdminCollapseContext";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
        <AdminCollapseProvider>
            <Router></Router>
        </AdminCollapseProvider>
    </AuthProvider>
  );
}

export default App;
