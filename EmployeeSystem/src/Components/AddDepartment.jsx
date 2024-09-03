import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddDepartment = () => {
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_department', { name: department, location: location })
            .then(result => {
                if (result.data.Status) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Department has been added.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/dashboard/department');
                    });
                } //else {
                    //Swal.fire({v
                        //title: 'Error!',
                       // text: result.data.Error,
                       // icon: 'error',
                        //confirmButtonText: 'OK'
                    //}
               // );
                //}
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while adding the department.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="department"><strong>Department:</strong></label>
                        <input 
                            type="text" 
                            name='department' 
                            placeholder='Enter department'
                            onChange={(e) => setDepartment(e.target.value)} 
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="location"><strong>Location:</strong></label>
                        <input 
                            type="text" 
                            name='location' 
                            placeholder='Enter location'
                            onChange={(e) => setLocation(e.target.value)} 
                            className='form-control rounded-0'
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Department</button>
                </form>
            </div>
        </div>
    );
}

export default AddDepartment;
