import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites: (state, action) => {
            return action.payload
        }
    }
})

    export const getFavoriteThunk = () => dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then(resp => dispatch(setFavorites(resp.data)))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    }

    export const addProductThunk = data => dispatch => {
        dispatch(setIsLoading(true))
        axios
            .post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
            .then(() => dispatch(getFavoriteThunk()))
            .catch(error => {
                if(error.response.status === 403) {
                    alert('El producto ya fue añadido al Carrito')
                }
                    console.error(error)})
            .finally( () => dispatch(setIsLoading(false)))
    }

    export const updateFavoriteThunk = (id, quantity) => (dispatch) => {
        dispatch(setIsLoading(true))

        const body = {
            quantity: quantity
        }

        axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
        .then(() => dispatch(getFavoriteThunk()))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    }

    export const deleteFavoriteThunk = id => dispatch => {
        dispatch(setIsLoading(true))

        axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getFavoriteThunk()))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    }

    export const purchaseCartThunk = () => dispatch => {
        dispatch(setIsLoading(true))

        axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {},  getConfig())
        .then(() => dispatch( getFavoriteThunk() ))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    }

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
