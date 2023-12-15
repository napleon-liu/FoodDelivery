import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import 'normalize.css'

import './assets/style/global.scss'

import App from './App'

import { Provider } from 'react-redux'
import store from './redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {/* <StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </StrictMode> */}
  </>
)
