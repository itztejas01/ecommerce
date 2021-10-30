import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
function ProductListScreen({history, match}) {

    const dispatch = useDispatch()

    const productList = useSelector(state=> state.productList) 
    const {loading, error, products} = productList
    
    const productDelete = useSelector(state=> state.productDelete) 
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete
   
    const productCreate = useSelector(state=> state.productCreate) 
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate


    const userLogin = useSelector(state=> state.userLogin) 
    const {userInfo} = userLogin
    
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        }
        
        if (successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch,history,userInfo, successDelete,successCreate, createdProduct])
    
    const deleteHandler = (id) => {

        if(window.confirm('Are you sure you want to delete this product')){

            // dispatch(deleteUser(id))
            dispatch(deleteProduct(id))
            console.log('delete the product',id)
        }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
        console.log('product is created: ')
    }

    return (
        <div>
           <Row className='align-items-center'>
               <Col>
                    <h1>Products</h1>
               </Col>
               <Col className='text-right'>
               <Button className='my-3' onClick={createProductHandler}>
                   <i className='fas fa-plus'> Create Products</i>
               </Button>
               </Col>

           </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading 
            ? (<Loader />)
            : error
            ? (<Message variant='danger'>{error}</Message>)
            :(
                <Table variant='light' striped bordered hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </thead>

                    <tbody>
                        {products.map(product =>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>Rs. {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                {/* <td>{product.isAdmin ? (
                                    <i className='fas fa-check' style={{color:'green'}}> Admin</i>
                                ):(
                                    <i className='fas fa-cross' style={{color:'red'}}> Not Admin</i>
                                )}</td> */}
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='warning' className='btn-sm col-xl-4 col-md-10'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm col-xl-4 col-md-10' onClick={()=> deleteHandler(product._id)}>
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



export default ProductListScreen
