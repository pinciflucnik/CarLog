import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import CarListItem from "../../cars/car-list-item/CarListItem"
import useCars from "../../../hooks/useCars"
import Loader from "../../loader/Loader";

export default function Profile() {
    const [cars, setCars] = useState([]);
    const [pending, setPending] = useState(true);
    const { auth } = useContext(AuthContext)
    const { getMyHandler } = useCars();
    useEffect(() => {
        (async () => {
            setPending(true);
            const list = await getMyHandler(auth.id, auth.accessToken);
            setCars(list);
            setPending(false);
        })()
    }, [])


    return (
        <>
            <div className="container">
                <div className="col-md-4 col-sm-6 user-profile">
                    <div className="profile-picture">
                        <img src="https://res.cloudinary.com/dtwyysfkn/image/upload/v1741525990/xryrdd8hjapnzif3j8ie.jpg" />

                    </div>
                    <div className="user-info">
                        <h1>Hello, {auth.username}</h1>
                    </div>
                </div>
            </div>
            <div className="container my-cars">
                {pending
                    ? <Loader />
                    : <>
                        {cars.map(car => <CarListItem key={car._id} car={car} />)}
                        {cars.length == 0 &&
                            <div className="col-md-12 no-cars">
                                <h1>You haven't added any cars yet</h1>
                            </div>
                        }
                    </>
                }
            </div>
        </>
    )
}