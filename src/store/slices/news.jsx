import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading';

export const newsSlice = createSlice({
    name: 'news',
    initialState: [],
    reducers: {
        setNews: (state, action) => {
            return action.payload
        }
    }
})

    export const getNewsThunk = () => (dispatch) => {

        dispatch(setIsLoading(true))
        
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(resp => dispatch( setNews(resp.data) ))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    }

    export const filterNewsByCategoryThunk = id => (dispatch) => {

        dispatch(setIsLoading(true))

        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then(resp => dispatch(setNews(resp.data)))
        .catch(error => console.error(error))
        .finally( () => dispatch(setIsLoading(false)))
    }

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;

//! axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}