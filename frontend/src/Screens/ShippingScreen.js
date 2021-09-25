import React, {useState, useEffect} from 'react'
import { Form,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import ProgressStep from '../components/ProgressStep'
import { saveShippingAddress } from '../actions/cartAction'

function ShippingScreen({history}) {
    const cart =  useSelector(state => state.cart)
    const { shippingAddress } = cart 

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address) 
    const [city, setCity] = useState(shippingAddress.city) 
    const [district, setDistrict] = useState(shippingAddress.district) 
    const [stateC, setStateC] = useState(shippingAddress.stateC) 
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode) 
    const [country, setCountry] = useState(shippingAddress.country) 
    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, district, stateC, postalCode, country}))
        history.push('/payment')
        // console.log('submit')
    }
    return (
        <FormContainer>
            <ProgressStep value={25} />
            <CheckoutStep step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Your address"
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

            <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Your City"
                        value={city ? city : ''}
                        onChange={(e) =>setCity(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
            <Form.Group controlId="district">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Your District"
                        value={district ? district : ''}
                        onChange={(e) =>setDistrict(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
            <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Your state"
                        value={stateC ? stateC : ''}
                        onChange={(e) =>setStateC(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
            
            <Form.Group controlId="postal code">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Your postal code"
                        value={postalCode ? postalCode : ''}
                        onChange={(e) =>setPostalCode(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

            <Form.Group controlId="Country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Your Country"
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
            <Button className="my-3" type="submit" variant='success'>
                Continue
            </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
