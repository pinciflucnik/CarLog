export default function CreateCar() {
    return (
        <div className="container add-car">
            <div className="col-md-4 col-sm-6">
                <div className="form-container">
                    <form className="car-form">
                        <h2>Add New Car</h2>
                        <label htmlFor="make">Make:</label>
                        <input type="text" id="make" name="make" required />

                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" name="model" required />

                        <label htmlFor="engine_capacity">Engine Capacity (cc):</label>
                        <input type="number" id="engine_capacity" name="engine_capacity" required />

                        <label htmlFor="power">Power (hp):</label>
                        <input type="number" id="power" name="power" required />

                        <label htmlFor="fuel_type">Fuel Type:</label>
                        <select id="fuel_type" name="fuel_type" required>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="LPG">LPG</option>
                            <option value="CNG">CNG</option>
                        </select>

                        <label htmlFor="odometer">Odometer (km):</label>
                        <input type="number" id="odometer" name="odometer" required />

                        <button type="submit">Add Car</button>
                    </form>
                </div>
            </div>
        </div>
    )
}