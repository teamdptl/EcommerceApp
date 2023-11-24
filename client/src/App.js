import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Router from "./routes/router";
import AdminCollapseProvider from "./components/admin/AdminCollapseProvider";


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
