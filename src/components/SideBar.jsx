import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import {getFavoriteThunk, updateFavoriteThunk, deleteFavoriteThunk, purchaseCartThunk} from '../store/slices/favorites'
import { useEffect, useState } from 'react';
import getConfig from '../utils/getConfig';
import axios from 'axios';
import '../style/nav.css'

function SideBar({show, handleClose}) {

    const favorites = useSelector(state => state.favorites)

    const dispatch = useDispatch()
    const [cart, setCart] = useState([])


    useEffect(() => {
        dispatch(getFavoriteThunk())
        getAll()
    }, [])

    const getAll = () => {
      axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
      .then(resp => setCart(resp.data))
      .catch(error => console.error(error))
    }

    const increment = value => {
        dispatch(updateFavoriteThunk(value.id, value.quantity +1 ))
    }
    const decrement = value => {
        if (value.quantity > 1) {
            dispatch(updateFavoriteThunk(value.id, value.quantity -1))
        } else {
          dispatch(deleteFavoriteThunk(value.id))
        }
    }
    const totalValue = (value1, value2) => {
      value1 + value2
    }

  return (
    <>
      <Offcanvas 
      placement='end' 
      show={show} 
      onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mis Productos</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='side-products'>
          {
            favorites.map(news => (

                <li className='side-product' key={news.id}>
                    {
                        news.product.images && (

                            <img style={{objectFit: 'contain', height: 150}} src={news.product.images[0].url} alt="" />
                        )
                    }
                    <p>{news.product.title}</p>
                      <div className='btn-container'>
                    <button onClick={() => 
                      decrement(news)}>-</button>
                    {news.quantity}
                    <button onClick={() => 
                      increment(news)}>+</button>
                      </div>
                    <div className='side-buttons'>
                    <p>Precio: ${news.product.price * news.quantity}</p>
                    <button className='side-delete' onClick={() =>  dispatch(deleteFavoriteThunk(news.id))}><i className='bx bx-trash'></i></button>
                    </div>
                </li>
            ))
          }
          </ul>
        </Offcanvas.Body>
          <div className='check-container'>
            <p>Total: </p>
            <button className='side-checkout' onClick={() => dispatch( purchaseCartThunk() )}>Checkout</button>
          </div>
      </Offcanvas>
    </>
  );
}

export default SideBar;