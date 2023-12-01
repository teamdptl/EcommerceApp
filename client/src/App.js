import React from "react";
import Router from "./routes/router";
import AdminCollapseContext from "./context/AdminCollapseContext";
import {AuthProvider} from "./context/AuthContext"


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
