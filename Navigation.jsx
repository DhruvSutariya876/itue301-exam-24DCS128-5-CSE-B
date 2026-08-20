import { Link, NavLink } from 'react-router-dom'

function Navigation({ bookCount }) {
  return (
    <header className="app-header">
      <Link className="brand" to="/"><span className="brand__mark">LB</span><span>Library book management</span></Link>
      <nav aria-label="Primary navigation">
        <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} to="/" end>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} to="/books">Books <span>{bookCount}</span></NavLink>
        <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} to="/borrow">Borrow</NavLink>
      </nav>
      <div className="profile-chip" aria-label="Signed in as Library staff"><span>LS</span> Library staff</div>
    </header>
  )
}

export default Navigation
