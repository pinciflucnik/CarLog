import { Link } from "react-router";

export default function CarListItem() {
    return (
        <div className='my-wrapper'>
            <div className="col-md-4 col-sm-6">
                <div className="single-service-item">
                    <div className="single-service-icon">
                        <div className="featured-cars-img">
                            <img src="https://cdn.sanity.io/images/c8ihu5xk/production/840ff45c4b19ad8cc874359ffc94631817a99902-2477x1651.jpg?fm=webp&w=2880&q=80&fit=min" alt="cars" />
                        </div>
                    </div>
                    <h2><Link to="#">largest dealership <span> of</span> car</Link></h2>
                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut den fugit sed quia.
                    </p>
                </div>
            </div>
        </div>

    )
}