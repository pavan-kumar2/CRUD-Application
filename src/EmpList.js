import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpList = () => {

    const [empdata, setEmpdata] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            setEmpdata(resp);
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const navigate = useNavigate()

    const detailFunc = (id) => {
        navigate("/employee/details/" + id);
    }

    const editFunc = (id) => {
        navigate("/employee/edit/" + id);
    }

    const deleteFunc = (id) => {
        if (window.confirm("Do You Want to Remove?")) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }


    return (
        <div>
            <div className="container">
                <div>
                    <div className="my-2">
                        <Link to="/employee/add" className="btn btn-success">Add Items <b>+</b></Link>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center my-3">
                                <h2>Employers Details</h2>
                            </div>
                            <table className="table table-bordered">
                                <thead className="table-dark border-white">
                                    <tr>
                                        <td>Id</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Phone</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        empdata && empdata.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td className="d-flex justify-content-between">
                                                    <div>
                                                        <input type="checkbox" checked={item.active}></input><span>Active</span>
                                                    </div>
                                                    <div className="d-flex" style={{ columnGap: "10px" }}>
                                                        <button className="btn btn-success" onClick={() => { editFunc(item.id) }}>Edit</button>
                                                        <button className="btn btn-primary" onClick={() => { detailFunc(item.id) }}>Details</button>
                                                        <button className="btn btn-danger" onClick={() => { deleteFunc(item.id) }}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmpList;
