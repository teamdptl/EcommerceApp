import React from "react";
import Router from "./routes/router";
import AdminCollapseProvider from "./components/admin/AdminCollapseProvider";


function App() {
  return (
    
        <AdminCollapseProvider>
            <Router></Router>
        </AdminCollapseProvider>
  );
}

export default App;
