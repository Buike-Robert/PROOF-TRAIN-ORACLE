import React, { useEffect, useState } from 'react'

export default function Datasets(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/mock/datasets.json')
      .then(r=>r.json())
      .then(j=>{ setData(j); setLoading(false) })
      .catch(()=>{ setData([]); setLoading(false) })
  },[])

  return (
    <div>
      <h1>Datasets</h1>
      {loading ? <p>Loading...</p> : (
        <div className="list">
          {data.length === 0 && <p>No datasets found (mock data).</p>}
          {data.map((ds, i)=> (
            <div className="item" key={i}>
              <div className="item-left">
                <strong>{ds.name}</strong>
                <div className="muted">rows: {ds.metrics.rows} • cols: {ds.metrics.columns}</div>
              </div>
              <div className="score">{ds.quality_score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
