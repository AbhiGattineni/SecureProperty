import AgentNavbar from "./navbar/AgentNavbar";

const AgentPage = () => {
    return (
        <>
            {/* // navbar */}
            <AgentNavbar />
            {/* //body */}
            <div className="container-fluid">
                <div className="m-3">
                    <h2 className="text-center">Agent Portal</h2>
                </div>
                <div className="row mt-2 justify-content-around">
                    <div className="col-md-5 border border-1 border-secondary">
                        <h4 className="m-1 text-center border border-2">Tasks to be done</h4>
                        <div className="progress">
                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="mt-2 card text-center">
                            <div className="card-header">
                                Featured
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">upload photos</a>
                            </div>
                            <div className="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 border border-1 border-secondary">
                        <h4 className="m-1 text-center border border-2">Tasks done</h4>
                        <div className="progress">
                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="card text-center mt-2">
                            <div className="card-header">
                                Featured
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">report</a>
                                <a href="#" className="btn btn-primary ms-2">re-upload</a>
                            </div>
                            <div className="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default AgentPage;