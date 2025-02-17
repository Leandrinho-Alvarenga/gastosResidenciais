import React from 'react'
import  {createRoot} from 'react-dom/client'
import GlobalStyle from './styles/global.js'
import Header from './components/Header/index.jsx'
import Resume from './components/Resume/index.jsx'
import Form from './components/Form/index.jsx'

import App from './APP/App.jsx'



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
    <GlobalStyle/>
    <Header/>
    <Resume/>
    <Form/>
    
    </App>
    
    
  </React.StrictMode>
)
