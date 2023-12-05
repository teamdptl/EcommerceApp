import React from "react";
import Router from "./routes/router";
import AdminCollapseProvider from "./context/AdminCollapseContext";
import { AuthProvider } from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";


function App() {
  return (
    <AuthProvider>
        <AdminCollapseProvider>
            <CartContextProvider>
                <Router></Router>
            </CartContextProvider>
        </AdminCollapseProvider>
    </AuthProvider>
  );
}

export default App;
