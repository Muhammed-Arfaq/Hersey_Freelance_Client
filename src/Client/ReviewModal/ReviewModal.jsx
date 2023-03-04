import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setSwitchOff } from "../../Redux/Reducer/reviewModal";
import CloseIcon from '@mui/icons-material/Close';
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../API";
import { toast, Toaster } from "react-hot-toast";

export default function ReviewModal() {
    const navigate = useNavigate()
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch()
    const token = localStorage.getItem("jwt")

    const [rating, setRating] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [gig, setGig] = useState("")

    const reviewData = {
        rating, title, description, gig
    }

    const eventHandler = (e) => {
        e.preventDefault()
        addReview(reviewData, token).then(() => {
            toast.success("Review Added Successfully")
            window.location.reload(false)
        })
    }

    const show = useSelector((state) => state.showReviewForm.show)
    const data = useSelector((state) => state.showReviewForm.data)

    console.log(data);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => dispatch(setSwitchOff())}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <Toaster/>
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gray-100 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className="text-end mr-2 mt-2 text-gray-600 cursor-pointer" onClick={() => dispatch(setSwitchOff())}
                                    ref={cancelButtonRef}>
                                    <CloseIcon />
                                </div>
                                <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div class=" grid font-mono grid-cols-12">
                                        <div class="border-0 p-4 rounded-md col-span-12">
                                            <form onSubmit={eventHandler}>
                                                <p className="font-bold text-base">
                                                    Rate
                                                </p>
                                                <p className="mt-2">
                                                    <Rating name="size-medium" value={rating}
                                                        onChange={(e) => {
                                                            setRating(e.target.value)
                                                        }} defaultValue={0} />
                                                </p>
                                                <div className="mt-4">
                                                    <label htmlFor="company-website" className="block font-bold text-base">
                                                        Title
                                                    </label>
                                                    <div className="mt-3 flex rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="company-website"
                                                            value={title}
                                                            onChange={(e) => {
                                                                setTitle(e.target.value)
                                                            }}
                                                            id="company-website"
                                                            className="block w-fit shadow-md flex-1 rounded-lg rounded-r-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Title here"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <label htmlFor="about" className="block font-bold text-base">
                                                        Description
                                                    </label>
                                                    <div className="mt-4">
                                                        <textarea
                                                            id="about"
                                                            name="about"
                                                            value={description}
                                                            onChange={(e) => {
                                                                setDescription(e.target.value)
                                                            }}
                                                            rows={3}
                                                            className="mt-1 block w-full rounded-md border-0 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Enter Your Review"
                                                        />
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                    </p>
                                                </div>
                                                <div className="px-4 py-3 text-right sm:px-6">
                                                    <button
                                                        onClick={() => setGig(data._id)}
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md bg-gradient-to-r from-slate-500 to-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
