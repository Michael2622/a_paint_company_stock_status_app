import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Add() {
    const navigate = useNavigate();

    //Initilizing values to be edited/submitted by user when submitting POST request
    const [values, setValues] = useState({
        colour_name: '',
        stock: '',
        status: ''
    })

    //Submits POST request to add specified values to MySQL table
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8825/paint_inventory', values)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    //Form to display fields to be used for adding entry
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h1>Add Paint Colour</h1>
                    <div className='mb-2'>
                        <label htmlFor=''>Colour Name</label>
                        <input type='text' placeholder='Enter Colour Name' class='form-control'
                            onChange={e => setValues({ ...values, colour_name: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Stock</label>
                        <input type='text' placeholder='Enter Stock' class='form-control'
                            onChange={e => setValues({ ...values, stock: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Status</label>
                        <select class='form-control'
                            onChange={e => setValues({ ...values, status: e.target.value })}>
                            <option value="error" hidden>Select Status</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Running Low">Running Low</option>
                            <option value="Available">Available</option>
                        </select>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Add