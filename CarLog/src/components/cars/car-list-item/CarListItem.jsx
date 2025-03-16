import { Link } from "react-router";

export default function CarListItem({
    car
}) {
    return (
        <div className="col-md-4 col-sm-6">
            <Link to={`/cars/${car._id}/details`}>
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