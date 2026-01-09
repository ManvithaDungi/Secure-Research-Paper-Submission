"use client"
import { Link, useNavigate } from "react-router-dom"

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await onLogout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-brand">
          Research Paper System
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          {user?.role === "author" && <Link to="/submit-paper">Submit Paper</Link>}
          {user?.role === "reviewer" && <Link to="/review-paper">Review Papers</Link>}
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="logout-btn btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
