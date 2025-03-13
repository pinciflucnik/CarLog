import { useContext } from "react";
import { useEffect, useState } from "react"
import AuthContext from "../../../context/AuthContext";
import ErrorContext from "../../../context/ErrorContext";
import useRefuel from "../../../hooks/useRefuel";
import ErrorMessage from "../../error/ErrorMessage";

export default function CarEditRefueling({
    refuelId,
    modalHandler
}) {
    const [refuel, setRefuel] = useState({});
    const { getCurrentRefuel } = useRefuel();
    const { editRefuel } = useRefuel();
    const { auth } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);


    useEffect(() => {
        getCurrentRefuel(refuelId)
            .then(data => {
                setRefuel(data)
            })
    }, [])
    const isFull = refuel.full
    async function onEdit(formData) {
        try {
            await editRefuel(formData, refuel, auth.accessToken)
            modalHandler()
        } catch (error) {
            errorSetter(error);
        }
    }

    return (
        <div className="modal my-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit refuel</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalHandler}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form action={onEdit}>
                        <div className="modal-body">
                            <div className="second-body">
                                <label htmlFor="km">Odometer reading</label>
                                <input type="number" id="km" name="km" defaultValue={refuel.km} />
                                <label htmlFor="liters">Liters</label>
                                <input type="number" id="liters" name="liters" step="any" defaultValue={refuel.liters} />
                                <fieldset required>
                                    <p>Is tank full?</p>
                                    <div>
                                        <label htmlFor="full">Yes</label>
                                        <input type="radio" id="full" name="full" value={true} />
                                    </div>
                                    <div>
                                        <label htmlFor="notFull">No</label>
                                        <input type="radio" id="notFull" name="full" value={false} />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="welcome-btn smaller">Edit</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalHandler}>Close</button>
                        </div>
                    </form>
                </div >
            </div >
        </div >
    )
}