import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import useCars from "../../../hooks/useCars";
import AuthContext from "../../../context/AuthContext";
import AddRefueling from "../car-add-refueling/AddRefueling";
import AddMaintenance from "../car-add-maintetance/AddMeintenance";
import useRefuel from "../../../hooks/useRefuel";
import useMaintain from "../../../hooks/useMaintain";
import Loader from "../../loader/Loader";

export default function CarDetails() {
    const [isOwner, setIsOwner] = useState(false);
    const [toggleModals, setToggle] = useState({});
    const [pending, setPending] = useState(true);
    const [average, setAverage] = useState(0);
    const [curAvg, setCurAvg] = useState(0);
    const [car, setCar] = useState({});
    const [lastRepair, setLastRepair] = useState({});
    const [sumRepairs, setSum] = useState(0);
    const [odometer, setOdo] = useState(0);
    const { auth } = useContext(AuthContext)
    const { carId } = useParams();
    const { getOneHandler, deleteCarHandler } = useCars();
    const { getRefuelsAsc, getRefuelsDesc, calculateAvg, calculateLastAvg } = useRefuel();
    const { getLatestHandler, sumAll } = useMaintain();


    function onDelete(e) {
        e.preventDefault()
        deleteCarHandler(carId, auth.accessToken);
    }


    function modalShow(e) {
        setToggle({ [e.target.value]: true });

    }
    function modalClose(e) {
        setToggle({ [e.target.value]: false })

    }

    useEffect(() => {
        setPending(true)
        getOneHandler(carId)
            .then(data => {

                setCar(data);
                
                if (auth.id === data._ownerId) {
                    setIsOwner(true);
                }
                setPending(false)
            })
    }, [])

    useEffect(() => {
        
        setPending(true)
        getRefuelsAsc(carId)
            .then(data => {

                const newAverage = calculateAvg(data, car)
                setAverage(newAverage.toFixed(1));
                setPending(false)

            })

        getRefuelsDesc(carId)
            .then(data => {

                if (data.length > 0) {
                    setOdo(data[0].km)
                } else {
                    setOdo(car.odometer)
                }
                const newCurAverage = calculateLastAvg(data, car);
                setCurAvg(newCurAverage.toFixed(1));
                setPending(false)

            });

        getLatestHandler(carId)
            .then(data => {
                if (data.length > 0) {
                    setLastRepair(data[0]);
                } else {
                    setLastRepair({ price: 'N/A' })
                }
                setPending(false)

            });

        sumAll(carId)
            .then(sum => {
                if (sum === 0) {
                    setSum('N/A')
                } else {
                    setSum(sum)
                }
                setPending(false)
            });

    }, [car, toggleModals])




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
                                                <img src={car.picture} alt={car.make} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12">
                                            <div className="new-cars-txt">
                                                <h2>Technical specifications</h2>
                                                <div className="details">
                                                    <p>Engine size: {car.capacity}cc</p>
                                                    <p>Engine power: {car.power}HP</p>
                                                    <p>Fuel type: {car.fuel}</p>
                                                    {isOwner && <Link to={`/cars/${carId}/edit`} className="welcome-btn smaller">Edit</Link>}
                                                    {isOwner && <button onClick={onDelete} className="welcome-btn smaller">Delete</button>}
                                                    {auth.email && !isOwner && <button className="welcome-btn smaller">Watch</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="single-new-cars-item">
                                    <div className="col-md-5 col-sm-12 inner">
                                        <div className="new-cars-txt">
                                            <h2>Refuelings</h2>
                                            <p>Average fuel consumption: <span className="consumption">{average == 0.0 ? "N/A " : `${average}l / 100km`}</span></p>
                                            <p className="new-cars-para2">Latest fuel consumption: {curAvg == 0.0 ? "N/A " : `${curAvg}l / 100km`}</p>
                                            <Link to={`/cars/${carId}/refuel-list`} className="welcome-btn smaller">Refuel List</Link>
                                            {isOwner && <button onClick={modalShow} className="welcome-btn smaller" value="refuel">Fill tank</button>}
                                        </div>
                                    </div>

                                </div>
                                <div className="single-new-cars-item">
                                    <div className="col-md-5 col-sm-12">
                                        <div className="new-cars-txt">
                                            <h2>Repairs and maintenance</h2>
                                            <p>Maintenance cost so far: <span className="consumption">{sumRepairs} {sumRepairs == "N/A" ? "" : "BGN"}</span></p>
                                            <p className="new-cars-para2">Cost of last maintenance was: {lastRepair.price} {lastRepair.price == "N/A" ? "" : "BGN"}</p>
                                            <Link to={`/cars/${carId}/view-repairs`} className="welcome-btn smaller">View list</Link>
                                            {isOwner && <button onClick={modalShow} className="welcome-btn smaller special" value="maintenance" >Add new</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {toggleModals.refuel && <AddRefueling modalClose={modalClose} carId={carId} odometer={odometer} />}
                        {toggleModals.maintenance && <AddMaintenance modalClose={modalClose} carId={carId} />}
                    </div>
                </>
            }
        </div>
    )
}