import React, {Fragment}from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <Fragment>

    <header className='main-header'>
        <h1>Main header</h1>

    <article className='nav-container'>
      <article className='nav-wrapper'>

        <section className='profile-and-search'>
          <article className='profile-details' style={{display: "flex"}}>
          <article className='profile-img' style={{height: "50px",width: "50px",  backgroundColor: "green"}}>
            <img width="150"/>
          </article>
          <article className='profile-name-email'>
          <span><h2>Thabo Siphiwe Mngoma</h2></span>
          <span><p style={{color: "#fff"}}>thabo.s.mngoma@gmail.com</p></span>
          </article>
          </article>
          <article className='search'>
            <input type='search' style={
              {
                width: "90%"
              }
            } placeholder='search' />
          </article>
        </section>

        <sectiion className='nav-section'>

          <ul style={{color: "#fff", borderTop: "1px solid #fff", marginTop: "10px"}}>
            <NavLink to="/mode/my-day">
              <li> My Day</li>
            </NavLink>
            <NavLink to="/mode/important">
              <li> Important</li>
            </NavLink>
            <NavLink to="/mode/planned">
              <li> Planned</li>
            </NavLink>
            <NavLink to="/mode/assigned-to-me">
              <li>Assigned to me</li>
            </NavLink>
            <NavLink to="/mode/flagged-email">
              <li>Flagged Email</li>
            </NavLink>
            <NavLink to="/mode/tasks">
              <li>Tasks</li>
            </NavLink>
          </ul>
          
        </sectiion>

        <section className='list-section'>
        <ul style={{color: "#fff", borderTop: "1px solid #fff", marginTop: "10px"}}>
              <li>Untitled list (1) </li>
        </ul>
        </section>

      </article>
    </article>
    </header>
    </Fragment>
  )
}

export default Header
