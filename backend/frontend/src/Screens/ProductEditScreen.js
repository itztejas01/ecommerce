import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct} from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen({match,history}) {

    const productId = match.params.id

    const [name,setName]= useState('')
    const [price,setPrice]= useState(0)
    const [image,setImage]= useState('')
    const [brand,setBrand]= useState('')
    const [category,setCategory]= useState('')
    const [countInStock,setCountInStock]= useState(0)
    const [description, setDescription] = useState('')
    const [uploading,setUploading]= useState(false)
    
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails
    
    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success: successUpdate} = productUpdate


    useEffect(()=>{

        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }
        else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            }
        }

        
        
    },[dispatch,product,productId, history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
      
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
        // console.log("update product")
        
    }

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()


        formData.append('image',file)
        formData.append('product_id',productId)
 
        setUploading(true)
        try{
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/',formData,config)
            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }
        // console.log('file is uploading')
    }

    return (
        <div>
        <Link to='/admin/productlist'>
            <Button variant='btn btn-success'>Go Back</Button>
        </Link>

       <FormContainer>
           <h1>Edit Product</h1>
           {loadingUpdate && <Loader/>}
           {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

           {loading ? <Loader /> :error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="enter product name"
                        value={name}
                        onChange={(e) =>setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder="enter product price"
                        value={price}
                        onChange={(e) =>setPrice(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="enter product image"
                        value={image}
                        onChange={(e) =>setImage(e.target.value)}
                    >
                    </Form.Control>

                    <Form.Control type='file' 
                    id='image-file'
                  
                    label='choose file'
                    accept='image/*'
                    onChange={uploadFileHandler} />
                    {uploading && <Loader />}
                    
                </Form.Group>

                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="enter product brand"
                        value={brand}
                        onChange={(e) =>setBrand(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="countInstock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder="enter product stock"
                        value={countInStock}
                        onChange={(e) =>setCountInStock(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="enter product category"
                        value={category}
                        onChange={(e) =>setCategory(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="enter product description"
                        value={description}
                        onChange={(e) =>setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

              

                 
             


                

                <Button className="my-2 btn-success" type="submit" variant='primary'>Update</Button>
               </Form>

              
)}
       </FormContainer>
       </div>
    )
}

export default ProductEditScreen
