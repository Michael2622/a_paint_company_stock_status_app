import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Home() {
    const [data, setData] = useState([])

    //GET request to get all entries from MySQL table to display on Web App
    useEffect(() => {
        Axios.get('http://localhost:8825/')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    //Submits DELETE request to have ID-specified entry deleted from MySQL server
    const handleDelete = (id) => {
        Axios.delete('http://localhost:8825/delete/'+id)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    //Displays all entries of MySQL table and provides buttons to manage the entries
    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3 table-responsive'>
                <h1>A Paint Company Stock Status</h1>
                <div className='d-flex justify-content-end vertical-align:top'>
                    <Link to='/add' className='btn btn-success'>Add</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Colour Name</th>
                            <th>Stock</th>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((paint_inventory, index) => {
                            return <tr key={index}>
                                <td>{paint_inventory.colour_name}</td>
                                <td>{paint_inventory.stock}</td>
                                <td>{paint_inventory.status}</td>
                                <td>
                                    <Link to={`/edit/${paint_inventory.id}`} className='btn btn-sm btn-info'>Edit</Link>
                                    <button onClick={ () => handleDelete(paint_inventory.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home