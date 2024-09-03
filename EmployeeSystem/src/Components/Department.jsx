import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Department = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
            .then(result => {
                if (result.data.Status) {
                    setDepartments(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/auth/delete_department/${id}`)
                    .then(result => {
                        if (result.data.Status) {
                            setDepartments(departments.filter(department => department.id !== id));
                            Swal.fire(
                                'Deleted!',
                                'The department has been deleted.',
                                'success'
                            );
                        } else {
                            Swal.fire(
                                'Error!',
                                result.data.Error,
                                'error'
                            );
                        }
                    }).catch(err => {
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the department.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Department List</h3>
            </div>
            <Link to="/dashboard/add_department" className='btn btn-success'>Add Department</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map(department => (
                                <tr key={department.id}>
                                    <td>{department.name}</td>
                                    <td>{department.location}</td>
                                    <td>
                                        <Link to={`/dashboard/edit_department/${department.id}`} className='btn btn-warning mx-2'>Edit</Link>
                                        <button onClick={() => handleDelete(department.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Department;
