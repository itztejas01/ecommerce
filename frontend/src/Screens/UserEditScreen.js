import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userAction'

function UserEditScreen({match,history}) {

    const userId = match.params.id

    const [first_name, setFirstName] = useState('') 
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('') 
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)

    const {error, loading, user} = userDetails

    useEffect(()=>{
        if(!user.name || user._id !== Number(userId)){
            dispatch(getUserDetails(userId))
        }else{
            setFirstName(user.name.split(' ')[0])
            setLastName(user.name.split(' ')[1])
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        
    },[user,userId])

    const submitHandler = (e) => {
        e.preventDefault()

        // console.log("submitted")
    }
    return (
        <div>
        <Link to='/admin/userlist'>
            Go back
        </Link>

       <FormContainer>
           <h1>Edit User</h1>
           {loading ? <Loader /> :error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='first_name'
                        placeholder="enter your first name"
                        value={first_name}
                        onChange={(e) =>setFirstName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='last_name'
                        placeholder="enter your last name"
                        value={last_name}
                        onChange={(e) =>setLastName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                 <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="enter the email address"
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                        disabled
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check
                    type='checkbox'
                    label='Is Staff'
                    checked={isAdmin}
                    className='mt-2'
                    onChange={(e)=>setIsAdmin(e.target.checked)}
                    >

                    </Form.Check>

                </Form.Group>


                

                <Button className="my-2 btn-success" type="submit" variant='primary'>Update</Button>
               </Form>

              
)}
       </FormContainer>
       </div>
    )
}

export default UserEditScreen
