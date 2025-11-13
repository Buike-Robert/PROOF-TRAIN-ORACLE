import React from 'react'

export default function Home(){
  return (
    <div>
      <h1>Project Overview</h1>
      <p>Proof Train Oracle dashboard. Use the left navigation to explore datasets and model proofs.</p>

      <section className="cards">
        <div className="card">
          <h3>Datasets</h3>
          <p>Evaluated datasets and quality scores</p>
        </div>
        <div className="card">
          <h3>Models</h3>
          <p>Model proofs, hashes, and accuracies</p>
        </div>
      </section>
    </div>
  )
}
