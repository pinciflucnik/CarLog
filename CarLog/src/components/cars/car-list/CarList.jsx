import { useEffect, useState } from "react"
import useCars from "../../../hooks/useCars";
import CarListItem from "../car-list-item/CarListItem";
import Loader from "../../loader/Loader";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [pending, setPending] = useState(true);
    const { getAllHandler } = useCars();
    useEffect(() => {
        const getCars = async () => {
            setPending(true)
            const list = await getAllHandler();
            setCars(list)
            setPending(false)
        };
        getCars()
    }, []);

    return (
        <div className="container add-car">
            {pending
                ? <Loader />
                : <>
                    {cars.length == 0 &&
                        <div className="col-md-12 no-cars">
                            <h1>You haven't added any cars yet</h1>
                        </div>
                    }
                    <div className="my-wrapper">
                        {cars.map(car => <CarListItem key={car._id} car={car} />)}
                    </div>
                </>
            }
        </div>

    )
}