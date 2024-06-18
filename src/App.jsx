import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import ArticleList from './components/ArticleList'

function App() {
  return (
<BrowserRouter>
  <div >
    <Header />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/articles" element={<ArticleList />} />
    </Routes>
  </div>
  </ BrowserRouter>
  )
}

export default App
