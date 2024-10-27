import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import router from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
);
