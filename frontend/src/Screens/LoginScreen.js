import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userAction'

function LoginScreen({location,history}) {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)

    const {error, loading, userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log("submitted")
        dispatch(login(email,password))
    }
    return (
        <FormContainer> 
            <h1>Login In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
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
                        type='password'
                        placeholder="enter password"
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
               
                <Button className="my-2 btn-success" type="submit" variant='primary'>Sign In</Button>
            </Form>
            <Row className="py-2">
                <Col>
                New Customer ? <Link to={redirect ? `/register/?redirect=${redirect}` : '/register'}>
                    Registered Here
                </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
