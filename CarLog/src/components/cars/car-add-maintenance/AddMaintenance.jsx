import useMaintain from "../../../hooks/useMaintain"

export default function AddMaintenance({
    modalClose,
    carId
}) {

    const { createHandler } = useMaintain();

    async function submitHandler(formData) {
        await createHandler(formData, carId);
        modalClose({ target: { value: "maintenance" } })

    }

    return (
        <div className="modal my-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add maintenance or repair</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form action={submitHandler}>
                        <div className="modal-body">
                            <div className="second-body">
                                <label htmlFor="title">Maintenance details</label>
                                <input type="text" id="title" name="title" required />
                                <label htmlFor="price">Cost</label>
                                <input type="number" id="price" name="price" required/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="welcome-btn smaller">Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modalClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}