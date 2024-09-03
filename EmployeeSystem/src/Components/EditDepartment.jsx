import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditDepartment = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/department/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setName(result.data.Result.name);
                    setLocation(result.data.Result.location);  // Fetch and set location
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: result.data.Error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }).catch(err => {
                console.log(err);
                // Swal.fire({
                //     title: 'Error!',
                //     text: 'An error occurred while fetching the department details.',
                //     icon: 'error',
                //     confirmButtonText: 'OK'
                // });
            });
    }, [id]);

    const handleUpdate = () => {
        axios.put(`http://localhost:3000/auth/edit_department/${id}`, { name, location })
            .then(result => {
                if (result.data.Status) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Department has been updated.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/dashboard/department');
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: result.data.Error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while updating the department.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Edit Department</h3>
            </div>
            <div className='mt-3'>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='form-control'
                    placeholder='Department Name'
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className='form-control mt-3'
                    placeholder='Location'
                />
                <button onClick={handleUpdate} className='btn btn-primary mt-3'>Update Department</button>
            </div>
        </div>
    );
}

export default EditDepartment;
