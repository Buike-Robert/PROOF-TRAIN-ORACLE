import React, { useEffect, useState } from 'react'

export default function Models(){
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/mock/models.json')
      .then(r=>r.json())
      .then(j=>{ setModels(j); setLoading(false) })
      .catch(()=>{ setModels([]); setLoading(false) })
  },[])

  return (
    <div>
      <h1>Models</h1>
      {loading ? <p>Loading...</p> : (
        <div className="list">
          {models.length === 0 && <p>No model proofs found (mock data).</p>}
          {models.map((m, i)=> (
            <div className="item" key={i}>
              <div className="item-left">
                <strong>{m.model_hash}</strong>
                <div className="muted">accuracy: {m.accuracy}% • trained: {m.training_time_s}s</div>
              </div>
              <div className="meta">{m.timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
