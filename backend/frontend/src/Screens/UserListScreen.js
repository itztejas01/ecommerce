import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUser, deleteUser } from '../actions/userAction'

function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state=> state.userList) 
    const {loading, error, users} = userList
   
    const userLogin = useSelector(state=> state.userLogin) 
    const {userInfo} = userLogin
    
    const userDelete = useSelector(state=> state.userDelete) 
    const {success:successDelete} = userDelete


    

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){

            dispatch(listUser())
        }else{
            history.push('/login')
        }
    },[dispatch,history,successDelete, userInfo])
    
    const deleteHandler = (id) => {

        if(window.confirm('Are you sure you want to delete this user')){

            dispatch(deleteUser(id))
        }
       // console.log('delete the user',id)
    }

    return (
        <div>
            <h1>User</h1>
            {loading 
            ? (<Loader />)
            : error
            ? (<Message variant='danger'>{error}</Message>)
            :(
                <Table variant='light' striped bordered hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </thead>

                    <tbody>
                        {users.map(user =>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{color:'green'}}> Admin</i>
                                ):(
                                    <i className='fas fa-cross' style={{color:'red'}}> Not Admin</i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm ms-3' onClick={()=> deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}



export default UserListScreen
