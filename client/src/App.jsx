import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Add from './Add'
import Edit from './Edit'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/add' element={<Add />}/>
        <Route path='/edit/:id' element={<Edit />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
