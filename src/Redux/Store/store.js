import { configureStore } from '@reduxjs/toolkit'
import currentChat from '../Reducer/currentChat'
import profileReducer from '../Reducer/profileModal'
import reserveReducer from '../Reducer/reserveModal'
import reviewReducer from '../Reducer/reviewModal'
import VendorReviewModal from '../Reducer/vendorReviewModal'
import viewReservedGigsReducer from '../Reducer/viewReservedGigs'

export const store = configureStore({
    reducer: {
        showReserveDetails: reserveReducer,
        showReviewForm: reviewReducer,
        editProfile: profileReducer,
        showVendorReviewForm: VendorReviewModal,
        viewReservedGigs: viewReservedGigsReducer,
        setCurrentChat: currentChat
    },
})