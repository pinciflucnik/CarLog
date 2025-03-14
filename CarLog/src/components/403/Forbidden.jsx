import { Link } from "react-router"

export default function Forbidden() {
    return (
            <div className="error-container col-md-12">
                <h1 className="error-code">403</h1>
                <p className="error-message">Access Denied</p>
                <p className="error-description">
                    You don’t have permission to access this page.
                </p>
                <Link to="/" className="welcome-btn">Go Back Home</Link>
            </div>
    )
}