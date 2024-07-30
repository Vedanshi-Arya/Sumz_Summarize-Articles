import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { store } from './services/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    {/* provider makes the Redux store avaliable to the rest of app */}

    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>
)
