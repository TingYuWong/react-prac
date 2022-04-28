import { Component, ErrorInfo } from "react"
import { Link, Navigate } from 'react-router-dom'

class ErrorBoundary extends Component<{}, { hasError: boolean; redirect: boolean; }> {
  constructor(props) {
    super(props)
    this.state = { hasError: false, redirect: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  componentDidUpdate() {
    if(this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true })
      }, 5000)
    }
  }

  render() {
    if(this.state.redirect) {
      return <Navigate to="/" />
    } else if(this.state.hasError) {
      return (
        <div>
          <h2>
              Oh no. There was an error!!!
              <Link to="/">Click here</Link>
              {" "}to back To HomePage 
              or we'll do it for you after five seconds.
          </h2>
        </div>
        )
    }

    return this.props.children
  }
}

export default ErrorBoundary
