import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export const EmpEdit = () => {

    const { empid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setId(resp.id);
            setName(resp.name);
            setEmail(resp.email);
            setPhone(resp.phone);
            setActive(resp.active);
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [active, setActive] = useState(false)
    const [validation, setValidation] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const empdata = { name, email, phone, active };

        fetch("http://localhost:8000/employee/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert("Saved Successfully.")
            navigate("/")
        }).catch((err) => {
            console.log(err.message)
        })

        setId("");
        setName("");
        setEmail("");
        setPhone("");
        setActive(false);
    }


    return (
        <div className='container card' style={{ 'width': '50%' }}>
            <div className='text-center my-3'><h2>Edit Employee Details</h2></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputId" className="form-label">Id</label>
                    <input type="number" value={id} onChange={(e) => { setId(e.target.value) }} disabled className="form-control" id="exampleInputId" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputName" className="form-label">Enter Name</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} onMouseDown={e=>{setValidation(true)}} required className="form-control" id="exampleInputName" />
                    {name.length === 0 && validation && <span className='text-danger'>Fill your name</span>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Enter Email address</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required className="form-control" id="exampleInputEmail1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Enter Phone Number</label>
                    <input type="number" value={phone} onChange={(e) => { setPhone(e.target.value) }} required className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" checked={active} onChange={(e) => { setActive(e.target.checked) }} className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Active</label>
                </div>
                <div className='d-flex' style={{ 'columnGap': '10px' }}>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/" type="Button" className="btn btn-primary">Back</Link>
                </div>

            </form>
        </div>
    )
}
