import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'

function RegisterScreen({location,history}) {
    const [first_name, setFirstName] = useState('') 
    const [last_name, setLastName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const {error, loading, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password!==confirmPassword){
            setMessage('Password do not match ! Please enter same password')
        }else{

            dispatch(register(first_name,last_name,email,password))
        }
        // console.log("submitted")
    }
    return (
       <FormContainer>
           <h1>Sign Up</h1>
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
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    required
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
                    required
                        type='password'
                        placeholder="enter confirm password"
                        value={confirmPassword}
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button className="my-2 btn-success" type="submit" variant='primary'>Register</Button>
               </Form>

               <Row className="py-2">
                <Col>
                Have an Account ? <Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}>
                    Login in
                </Link>
                </Col>
            </Row>
       </FormContainer>
    )
}

export default RegisterScreen
