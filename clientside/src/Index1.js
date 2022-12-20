import React from 'react'
import App from './App.js'
import Update from './Update.js'
import {Routes,Route} from 'react-router-dom'
function index1() {
  return (
    <div>
        <Routes>
            <Route index element={<App></App>}></Route>
            <Route path='/update' element={<Update></Update>}></Route>
        </Routes>
    </div>
  )
}

export default index1