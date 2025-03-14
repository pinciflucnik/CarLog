import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router"
import AuthContext from "../../../context/AuthContext";
import useCars from "../../../hooks/useCars";
import useMaintain from "../../../hooks/useMaintain";
import CarEditMaintenance from "../car-edit-maintenance/CarEditMaintenance";
import Loader from "../../loader/Loader";

export default function CarMaintenanceList() {
    const [car, setCar] = useState({});
    const [pending, setPending] = useState(true)
    const [isOwner, setIsOwner] = useState(false);
    const [repairs, setRepairs] = useState([]);
    const [toggleModals, setToggle] = useState(false);
    const [repairId, setId] = useState('');
    const { carId } = useParams();
    const { auth } = useContext(AuthContext);
    const { getOneHandler } = useCars();
    const { getAllHandler, deleteMaintenance } = useMaintain();

    useEffect(() => {
        setPending(true)
        getOneHandler(carId)
            .then(data => {
                setCar(data)
                setPending(false)
            })
        getAllHandler(carId)
            .then(data => {
                setRepairs(data)
                setPending(false)
            })
    }, [toggleModals]);
    useEffect(() => {
        if (car._ownerId === auth.id) {
            setIsOwner(true);
        } else {
            setIsOwner(false)
        }
    }, [car]);

    const modalHandler = (id) => {
        setToggle(state => !state);
        if (id) {
            setId(id);
        }
    }
    const deleteHandler = async (id) => {
        await deleteMaintenance(id, carId);
    }

    return (
        <div className="my-wrapper">
            {pending
                ? <Loader />
                : <>
                    <div className="container">
                        <div className="section-header">
                            <h2>{car.make} {car.model}</h2>
                        </div>
                        <div className="new-cars-content">
                            <div className="new-cars-item">
                                <div className="single-new-cars-item">
                                    <div className="row">
                                        <div className="col-md-7 col-sm-12">
                                            <div className="new-cars-img">
                                                <Link to={`/cars/${car._id}/details`}>
                                                    <img src={car.picture} alt={car.make} />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12">
                                            <div className="new-cars-txt">
                                                <h2>Technical specifications</h2>
                                                <div className="details">
                                                    <p>Engine size: {car.capacity}cc</p>
                                                    <p>Engine power: {car.power}HP</p>
                                                    <p>Fuel type: {car.fuel}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="single-new-cars-item">
                                    <div className="col-md-12 col-sm-12">
                                        <div className="table-container">
                                            {repairs.length > 0 && <table className="my-table">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Type</th>
                                                        <th>Price</th>
                                                        {isOwner && <th>Actions</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {repairs.map((repair) => (
                                                        <tr key={repair._id}>
                                                            <td><span className="table-data">{new Date(repair._createdOn).toLocaleDateString()}</span></td>
                                                            <td><span className="table-data">{repair.title}</span></td>
                                                            <td><span className="table-data">{repair.price} BGN</span></td>
                                                            {isOwner &&
                                                                <td>
                                                                    <button onClick={() => modalHandler(repair._id)} className="form-btn">Edit</button>
                                                                    <button onClick={() => deleteHandler(repair._id)} className="form-btn">Delete</button>
                                                                </td>
                                                            }
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            }
                                            {repairs.length === 0 &&
                                                <div className="col-md-12 no-cars">
                                                    <h1>There are no records to display</h1>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {toggleModals && <CarEditMaintenance repairId={repairId} modalHandler={modalHandler} />}
                        </div>
                    </div>
                </>
            }
        </div>

    )
}