import axios from "axios"
import { useState, useEffect } from "react"
import {setIsLoading} from '../store/slices/isLoading'
import { useDispatch } from "react-redux"
import getConfig from "../utils/getConfig"
import Button from 'react-bootstrap/Button';
import '../style/main.css'

const Favorites = () => {

    const dispatch = useDispatch()

    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        dispatch(setIsLoading(true))
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
        .then(resp => setPurchases(resp.data))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    },[])
    

    return(
        <main className="favorites-main">
            <ul className="list-container">
                {
                    purchases.map(item => (
                <li className="list-item" key={item.id}>
                    <img src={item.product.images[0].url} alt="" style={{width: 150, height: 200, objectFit: 'contain'}} />
                    <h1>{item.product.title}</h1>
                </li>
                    ))
                }
            </ul>
        </main>
    )
}

export default Favorites