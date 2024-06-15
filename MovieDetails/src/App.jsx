import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Homepage from './Pages/Homepage'
import Info from './Pages/components/Info'
import TvInfo from './Pages/components/TvInfo'


function App() {
  

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/info/:id' element={<Info />} />
            <Route path='/tvinfo/:id' element={<TvInfo />} />
          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App
