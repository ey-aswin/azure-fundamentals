import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const HomeComponent =()=> {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
        </a>
        <a href="https://react.dev" target="_blank">
        </a>
      </div>
      <NavLink to={"dashboard"}>Dashboard Components</NavLink>
      <br />
      <NavLink to={"scroll"}>Infinite Scroll Components</NavLink>
      <h1>Azure Fundamentals</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


export default HomeComponent
