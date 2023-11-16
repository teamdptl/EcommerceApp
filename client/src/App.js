import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/router";


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
