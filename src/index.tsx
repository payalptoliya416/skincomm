import './app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import BrowserRoute from "./Routes/Routes";
import { Provider } from "react-redux";
import { store, persist } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persist }>
            <BrowserRoute />
        </PersistGate>
    </Provider>
);
