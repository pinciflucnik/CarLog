import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"
import CarListItem from "../../cars/car-list-item/CarListItem"

export default function Profile() {
    const { auth } = useContext(AuthContext)
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
            <div className="container">
                {/* <CarListItem /> */}
            </div>
        </>
    )
}