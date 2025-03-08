import { Link } from 'react-router';

export default function Home() {
    return (
        <div className='my-wrapper'>
            <div className="welcome-hero-txt" >
                <h2>Your Ultimate Vehicle Maintenance Tracker</h2>
                <p>
                Keeping track of your car’s fuel consumption, repairs, and maintenance has never been easier! CarLog is designed to help you log refuelings, track repairs, and monitor servicing costs effortlessly.
                </p>
                <Link to="/cars" className="welcome-btn" >See all cars</Link>
            </div>
        </div>

    )
}