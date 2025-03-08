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
                        <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" />

                    </div>
                    <div className="user-info">
                        <h1>Hello {auth.email}</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <CarListItem />
            </div>
        </>
    )
}