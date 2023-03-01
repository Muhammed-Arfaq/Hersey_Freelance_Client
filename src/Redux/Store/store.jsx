import { configureStore } from '@reduxjs/toolkit'
import currentChat from '../Reducer/currentChat'
import profileReducer from '../Reducer/profileModal'
import reserveReducer from '../Reducer/reserveModal'
import reviewReducer from '../Reducer/reviewModal'
import vendorReducer from '../Reducer/VendorReviewModal'
import viewReservedGigsReducer from '../Reducer/viewReservedGigs'

export const store = configureStore({
    reducer: {
        showReserveDetails: reserveReducer,
        showReviewForm: reviewReducer,
        editProfile: profileReducer,
        showVendorReviewForm: vendorReducer,
        viewReservedGigs: viewReservedGigsReducer,
        setCurrentChat: currentChat
    },
})