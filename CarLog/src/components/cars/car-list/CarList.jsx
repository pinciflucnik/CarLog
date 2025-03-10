import { useEffect, useState } from "react"
import useCars from "../../../hooks/useCars";
import CarListItem from "../car-list-item/CarListItem";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const { getAllHandler } = useCars();
    useEffect(() => {
        const getCars = async () => {
            const list = await getAllHandler();
            setCars(list)
        };
        getCars()
    }, []);

    return (
        <div className="container add-car">
            {cars.length == 0 &&
                <div className="col-md-12 no-cars">
                    <h1>You haven't added any cars yet</h1>
                </div>
            }
            <div className="my-wrapper">
                {cars.map(car => <CarListItem key={car._id} car={car} />)}
            </div>
        </div>

    )
}