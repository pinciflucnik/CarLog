import { Link } from "react-router";

export default function CarListItem({
    car
}) {
    //remove my-wrapper when you get to all cars
    return (
        <div className="col-md-4 col-sm-6">
            <Link to={`/cars/CARID/details`}>
                <div className="single-service-item">
                    <div className="single-service-icon">
                        <div className="featured-cars-img">
                            <img src={car.picture} alt={car.make} />
                        </div>
                    </div>
                    <h2>{car.make} {car.model}</h2>
                    <p>Power: {car.power}HP</p>
                    <p>Type of fuel: {car.fuel}</p>
                </div>
            </Link>
        </div>

    )
}