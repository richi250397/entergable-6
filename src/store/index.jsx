import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading'
import news from './slices/news'
import favorites from './slices/favorites'

export default configureStore({
    reducer: {
        isLoading,
        news,
        favorites
    }
})
