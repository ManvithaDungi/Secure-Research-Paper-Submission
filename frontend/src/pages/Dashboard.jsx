"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Dashboard({ user }) {
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true)
        const endpoint = user?.role === "author" ? "/api/papers/my-papers" : "/api/papers/for-review"
        const response = await api.get(endpoint)
        setPapers(response.data.papers || [])
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load papers")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPapers()
  }, [user?.role])

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Role: {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button className="alert-close" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}

      {/* Author Dashboard */}
      {user?.role === "author" && (
        <>
          <div className="card-grid">
            <div className="card">
              <h2>Submit New Paper</h2>
              <p>Upload and submit your research papers for peer review.</p>
              <button className="btn btn-primary" onClick={() => navigate("/submit-paper")}>
                Submit Paper
              </button>
            </div>
            <div className="card">
              <h2>My Papers</h2>
              <p>View the status of papers you have submitted.</p>
              <p style={{ color: "#27ae60", fontWeight: "bold" }}>{papers.length} papers</p>
            </div>
          </div>

          {papers.length > 0 && (
            <div className="papers-list">
              <h2>Your Submitted Papers</h2>
              {papers.map((paper) => (
                <div key={paper.id} className="paper-item">
                  <div className="paper-info">
                    <h3>{paper.title}</h3>
                    <p>Submitted: {new Date(paper.submitted_at).toLocaleDateString()}</p>
                    <p>Reviews: {paper.review_count || 0}</p>
                  </div>
                  <span className={`paper-status status-${paper.status}`}>
                    {paper.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Reviewer Dashboard */}
      {user?.role === "reviewer" && (
        <>
          <div className="card-grid">
            <div className="card">
              <h2>Review Papers</h2>
              <p>Review papers submitted by authors in your field.</p>
              <button className="btn btn-primary" onClick={() => navigate("/review-paper")}>
                Start Reviewing
              </button>
            </div>
            <div className="card">
              <h2>Papers Available</h2>
              <p>Papers waiting for your review.</p>
              <p style={{ color: "#3498db", fontWeight: "bold" }}>{papers.length} papers</p>
            </div>
          </div>

          {papers.length > 0 && (
            <div className="papers-list">
              <h2>Papers Under Review</h2>
              {papers.map((paper) => (
                <div key={paper.id} className="paper-item">
                  <div className="paper-info">
                    <h3>{paper.title}</h3>
                    <p>Author: {paper.author_name}</p>
                    <p>Submitted: {new Date(paper.submitted_at).toLocaleDateString()}</p>
                  </div>
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => navigate("/review-paper", { state: { paperId: paper.id } })}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {papers.length === 0 && (
        <div className="empty-state">
          <h2>No papers yet</h2>
          <p>
            {user?.role === "author"
              ? "Submit your first paper to get started."
              : "No papers available for review at the moment."}
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
