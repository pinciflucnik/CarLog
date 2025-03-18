import { useEffect } from "react";
import useMaintain from "../../../hooks/useMaintain"

export default function CarEditMaintenance({
    repairId,
    modalHandler
}) {
    const {getSingleMaintenance, editMaintenance, setMyCurrent, current, isPending} = useMaintain();

    useEffect(()=> {
        getSingleMaintenance(repairId)
            .then(data => {
                setMyCurrent(data)
            })
    },[]);

    async function onEdit(formData) {
        await editMaintenance(formData);
        modalHandler(current._id);
        
    }
    return (
        <div className="modal my-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalHandler}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form action={onEdit}>
                        <div className="modal-body">
                            <div className="second-body">
                                <label htmlFor="title">Maintenance details</label>
                                <input type="text" id="title" name="title" defaultValue={current.title} required/>
                                <label htmlFor="price">Cost</label>
                                <input type="number" id="price" name="price" defaultValue={current.price} required/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" disabled={isPending} className="welcome-btn smaller">Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalHandler}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}