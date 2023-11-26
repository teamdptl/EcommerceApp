import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Router from "./routes/router";
import AdminCollapseContext from "./context/AdminCollapseContext";


function App() {
  return (
    <AuthProvider>
        <AdminCollapseContext>
            <Router></Router>
        </AdminCollapseContext>
    </AuthProvider>
  );
}

export default App;
