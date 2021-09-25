import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails,updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({history}) {
    const [first_name, setFirstName] = useState('') 
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch()

    const userDetails= useSelector(state => state.userDetails)

    const {error, loading, user } = userDetails
    
    const userLogin= useSelector(state => state.userLogin)

    const {userInfo} = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { success } = userUpdateProfile

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setFirstName(user.name.split(' ')[0])
                setLastName(user.name.split(' ')[1])
                setEmail(user.email)
                
            }
        }
    },[dispatch,history,userInfo,user,success])
    

    const submitHandler = (e) => {
        e.preventDefault()

        if(password!==confirmPassword){
            setMessage('Password do not match ! Please enter same password')
        }else{

            // dispatch(register(first_name,last_name,email,password))
            dispatch(updateUserProfile({
                'id':user._id,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password,
        }))
        setMessage('')
        }
        // console.log("submitted")
}

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
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
                    required
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
                    required
                        type='email'
                        placeholder="enter the email address"
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                        disabled
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    
                        type='password'
                        placeholder="enter password"
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="enter confirm password"
                        value={confirmPassword}
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button className="my-2 btn-success" type="submit" variant='primary'>Update</Button>
               </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
