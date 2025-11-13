import React, { useState } from 'react'
import Home from './pages/Home'
import Datasets from './pages/Datasets'
import Models from './pages/Models'

function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <div className="brand">Proof Train Oracle</div>
      <div className="links">
        <button onClick={() => setPage('home')} className={page === 'home' ? 'active' : ''}>Home</button>
        <button onClick={() => setPage('datasets')} className={page === 'datasets' ? 'active' : ''}>Datasets</button>
        <button onClick={() => setPage('models')} className={page === 'models' ? 'active' : ''}>Models</button>
      </div>
    </nav>
  )
}

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app">
      <Nav page={page} setPage={setPage} />
      <main className="container">
        {page === 'home' && <Home />}
        {page === 'datasets' && <Datasets />}
        {page === 'models' && <Models />}
      </main>
    </div>
  )
}
