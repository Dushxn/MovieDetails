import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Homepage from './Pages/Homepage'


function App() {
  

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App
