import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Add() {
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        colour_name: '',
        stock: '',
        status: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8081/paint_inventory', values)
        .then(res => {
            console.log(res)
            navigate('/')
        })            
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h1>Add Paint Colour</h1>
                    <div className='mb-2'>
                        <label htmlFor=''>Colour Name</label>
                        <input type='text' placeholder='Enter Colour Name' class='form-control'
                        onChange={e => setValues({...values, colour_name: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Stock</label>
                        <input type='text' placeholder='Enter Stock' class='form-control'
                        onChange={e => setValues({...values, stock: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Status</label>
                        <input type='text' placeholder='Enter Status' class='form-control'
                        onChange={e => setValues({...values, status: e.target.value})}/>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Add