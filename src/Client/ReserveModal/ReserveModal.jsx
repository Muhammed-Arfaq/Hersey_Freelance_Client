import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateSwitchOff } from "../../Redux/Reducer/ReserveModal";
import CloseIcon from '@mui/icons-material/Close';

export default function ReserveModal() {
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch()
    const show = useSelector((state) => state.showReserveDetails.show)


    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => dispatch(setCreateSwitchOff())}
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gray-100 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                <div className="text-end mr-2 mt-2 text-gray-600 cursor-pointer" onClick={() => dispatch(setCreateSwitchOff())}
                                    ref={cancelButtonRef}>
                                    <CloseIcon />
                                </div>
                                <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                                    <div class=" grid place-items-center font-mono">

                                        <div class="border-0 rounded-md ">
                                            <div class="md:flex px-4 leading-none max-w-4xl">
                                                <div class="flex-none ">
                                                    <img
                                                        src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                                                        alt="pic"
                                                        class="h-72 w-56 rounded-md shadow-2xl transform -mt-4  "
                                                    />
                                                </div>

                                                <div class="flex-col ">

                                                    <p class="pt-4 text-2xl font-bold">Joker (2020)</p>
                                                    <hr class="hr-text" data-content="" />

                                                    <p class="hidden md:block px-4 my-4 text-sm text-left">In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker. </p>

                                                    <p class="flex text-md px-4 my-2">
                                                        Price: ₹4000
                                                    </p>
                                                    <div className="ml-4 mt-4">
                                                        <label htmlFor="about" className="block">
                                                            Requirements:
                                                        </label>
                                                        <div className="mt-4">
                                                            <textarea
                                                                id="about"
                                                                name="about"
                                                                rows={3}
                                                                className="mt-1 block w-full rounded-md border-0 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                placeholder="Enter Your Requirements"


                                                            />
                                                        </div>
                                                        <p className="mt-2 text-sm text-gray-500">
                                                        </p>
                                                    </div>



                                                </div>
                                            </div>
                                            <div className="px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md bg-gradient-to-r from-slate-500 to-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm"
                                                >
                                                    Reserve Now
                                                </button>
                                            </div>
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
