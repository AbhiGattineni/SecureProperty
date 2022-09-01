import CustomerNavbar from "./navbar/CustomerNavbar";

const CustomerPage = () => {
    return (
        <>
            {/* // navbar */}
            <CustomerNavbar />
            {/* //body */}
            <div className="container-fluid">
                <div className="m-3">
                    <h2 className="text-center">Customer Portal</h2>
                </div>
                <div className="row border border-1 border-dark m-3 align-items-center">
                    <div className="col-sm-3">
                        <div className="card" style={{ width: "18rem" }}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="card text-center">
                            <div className="card-header">
                                Featured
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            <div className="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
}

export default CustomerPage;