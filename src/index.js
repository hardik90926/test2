import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./assets/scss/app.scss";
import Router from "./routes";

//config data
import configDB from "./data/customizer/config";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false
    }
  }
});

const Root = () => {
  useEffect(() => {
    // light | dark-only
    const layout =
      localStorage.getItem("layout_version") ||
      configDB.data.color.layout_version;
    document.body.classList.add(layout);

    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const persistor = persistStore(store);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <QueryClientProvider client={queryClient}>
              <Router />
            </QueryClientProvider>
          </div>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
