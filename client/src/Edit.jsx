import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import axios from 'axios';

function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    
    //Initilizing values to be replaced by GET request
    const [values, setValues] = useState({
        colour_name: '',
        stock: '',
        status: ''
    })

    //Queries for values from node.js API/server
    useEffect(() => {
        Axios.get('http://localhost:8825/edit/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, colour_name: res.data[0].colour_name, stock: res.data[0].stock, status: res.data[0].status})
        })
        .catch(err => console.log(err))
    }, [])

    //Makes PUT request to node.js API/server to replace current values of the ID-specified entry
    const handleEdit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8825/edit/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    //Form to display editable fields
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleEdit}>
                    <h1>Update Paint Colour</h1>
                    <div className='mb-2'>
                        <label htmlFor=''>Colour Name</label>
                        <input type='text' placeholder='Enter Colour Name' class='form-control' value={values.colour_name}
                            onChange={e => setValues({ ...values, colour_name: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Stock</label>
                        <input type='text' placeholder='Enter Stock' class='form-control' value={values.stock}
                            onChange={e => setValues({ ...values, stock: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Status</label>
                        <input type='text' placeholder='Enter Status' class='form-control' value={values.status}
                            onChange={e => setValues({ ...values, status: e.target.value })} />
                    </div>
                    <button className='btn btn-success'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Edit