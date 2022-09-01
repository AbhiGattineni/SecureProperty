import LoginNavbar from "./navbar/LoginNavbar";


const Login = () => {
    return (
        <>
            <LoginNavbar />
            <form className="m-5 row justify-content-center">
                <div className="col-sm-6 ">
                    <div className="mb-3">
                        <h2 className="text-center">SECURE PROPERTY</h2>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <div className="justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;