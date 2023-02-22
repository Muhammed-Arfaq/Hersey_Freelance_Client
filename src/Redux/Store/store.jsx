import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../Reducer/profileModal'
import reserveReducer from '../Reducer/reserveModal'
import reviewReducer from '../Reducer/reviewModal'
import vendorReducer from '../Reducer/VendorReviewModal'

export const store = configureStore({
    reducer: {
        showReserveDetails: reserveReducer,
        showReviewForm: reviewReducer,
        editProfile: profileReducer,
        showVendorReviewForm: vendorReducer,
    },
})