import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export const EmpDetails = () => {

    const { empid } = useParams();

    const [empdata, setEmpdata] = useState({});



    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setEmpdata(resp);
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    return (
        <div className='container d-flex justify-content-center my-4 d-flex flex-column align-items-center'>
            <div>
                <h2>Employee Details</h2>
            </div>
            {
                empdata &&
                <div className="card text-bg-dark mb-3" style={{"max-width":"30rem", "max-height":"30rem"}}>
                    <div className="card-header"><h1>Name: {empdata.name}</h1></div>
                    <div className="card-body d-flex flex-column" style={{'row-gap':'20px'}}>
                        <h5 className="card-title">Phone: <a href='tel:{empdata.phone}' style={{'text-decoration':'none', 'color':'white'}}>{empdata.phone}</a></h5>
                        <h5 className="card-text">Email: <a href='mailto:{empdata.email}' style={{'text-decoration':'none', 'color':'white'}}>{empdata.email}</a></h5>
                       <div className='bg-warning p-1'>{empdata.active?<h6 className='m-0'>Active</h6>:<h6 className='m-0'>Unactive</h6>}</div>
                    </div>
                    <div className='d-flex justify-content-center my-2'>
                    <Link type="button" to='/' className="btn btn-primary" style={{'width':'150px'}}>Back</Link>
                        </div>
                </div>
            }

        </div>
    )
}
