import { Link } from "react-router";

export default function CarDetails() {
    return (
        <div className="my-wrapper">
            <div className="container">
                <div className="section-header">
                    <h2>CAR MAKE & MODEL</h2>
                </div>
                <div className="new-cars-content">
                    <div className="new-cars-item">
                        <div className="single-new-cars-item">
                            <div className="row">
                                <div className="col-md-7 col-sm-12">
                                    <div className="new-cars-img">
                                        <img src="https://res.cloudinary.com/dtwyysfkn/image/upload/v1741519670/kuyqdei9ut5qqqwigwna.webp" alt="img" />
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-12">
                                    <div className="new-cars-txt">
                                        <h2>Technical specifications</h2>
                                        <div className="details">
                                            <p>Engine size: here goes engine size</p>
                                            <p>Engine power: hafhsurh</p>
                                            <p>Fuel type: used fuel type</p>
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
                                    <p>Average fuel consumption: <span className="consumption">6.2l / 100km</span></p>
                                    <p className="new-cars-para2">Latest fuel consumption: 7.8l / 100km</p>
                                    <Link to='#' className="welcome-btn smaller">
                                        Refuelings
                                    </Link>
                                    <Link to='#' className="welcome-btn smaller">
                                        Fill tank
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <div className="single-new-cars-item">
                            <div className="col-md-5 col-sm-12">
                                <div className="new-cars-txt">
                                    <h2>Repairs and maintenance</h2>
                                    <p>Maintenance cost so far: <span className="consumption">6200 BGN</span></p>
                                    <p className="new-cars-para2">Cost of last maintenance was: 1000BGN</p>
                                    <Link to='#' className="welcome-btn smaller">
                                        View list
                                    </Link>
                                    <Link to='#' className="welcome-btn smaller special">
                                        Add new
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}