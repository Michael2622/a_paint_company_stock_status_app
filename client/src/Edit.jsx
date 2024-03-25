import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import axios from 'axios';

function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        colour_name: '',
        stock: '',
        status: ''
    })

    useEffect(() => {
        Axios.get('http://localhost:8081/edit/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, colour_name: res.data[0].colour_name, stock: res.data[0].stock, status: res.data[0].status})
        })
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

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