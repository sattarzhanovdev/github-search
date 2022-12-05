import React from 'react'
import { BASE_URL } from './API'
import axios from 'axios'
import Header from './Components/Header'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Main from './Components/Main'
axios.defaults.baseURL = BASE_URL

const App = () => {

  React.useEffect(() => {
    localStorage.setItem('username', 'sattarzhanovdev')
  }, [])
  
  return (
    <div>
      <Header />
    </div>
  )
}

export default App