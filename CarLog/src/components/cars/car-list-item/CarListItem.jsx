import { Link } from "react-router";

export default function CarListItem() {
    //remove my-wrapper when you get to all cars
    return (
        <div className='my-wrapper'> 
            <div className="col-md-4 col-sm-6">
            <Link to={`/cars/CARID/details`}>
                <div className="single-service-item">
                    <div className="single-service-icon">
                        <div className="featured-cars-img">
                            <img src="https://cdn.sanity.io/images/c8ihu5xk/production/840ff45c4b19ad8cc874359ffc94631817a99902-2477x1651.jpg?fm=webp&w=2880&q=80&fit=min" alt="cars" />
                        </div>
                    </div>
                    <h2>BMW 320d</h2>
                    <p>Power: 200HP</p>
                    <p>Type of fuel: diesel</p>
                </div>
            </Link>
            </div>
        </div>

    )
}