import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="error-container col-md-12">
            <h1 className="error-code">404</h1>
            <p className="error-message">Page Not Found</p>
            <p className="error-description">
                The page you are looking for does not exist.
            </p>
            <Link to="/" className="welcome-btn">Return to Home</Link>
        </div>
    )
}