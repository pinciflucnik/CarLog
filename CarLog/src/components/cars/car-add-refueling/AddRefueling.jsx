export default function AddRefueling({
    close
}) {

    console.log(close);
    
    return (
        <div className="modal my-modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Refuel</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">
                            <div className="second-body">
                                <label htmlFor="km">Odometer reading</label>
                                <input type="number" id="km" name="km" />
                                <label htmlFor="liters">Liters</label>
                                <input type="number" id="liters" name="liters" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="welcome-btn smaller">Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}