import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { switchOff } from "../../Redux/Reducer/profileModal";
import CloseIcon from '@mui/icons-material/Close';
import { Rating } from "@mui/material";

export default function ProfileModal() {
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch()
    const show = useSelector((state) => state.editProfile.show)

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => dispatch(switchOff())}
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gray-100 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className="text-end mr-2 mt-2 text-gray-600 cursor-pointer" onClick={() => dispatch(switchOff())}
                                    ref={cancelButtonRef}>
                                    <CloseIcon />
                                </div>
                                <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div class=" grid font-mono grid-cols-12">
                                        <div className="grid col-span-12 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email-address"
                                                    id="email-address"
                                                    autoComplete="email"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    D.O.B
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    id="country"
                                                    autoComplete="country"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label htmlFor="city" className="block mt-3 text-sm font-medium text-gray-700">
                                                    Mobile
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="region" className="block mt-3 text-sm font-medium text-gray-700">
                                                    Age
                                                </label>
                                                <input
                                                    type="text"
                                                    name="region"
                                                    id="region"
                                                    autoComplete="address-level1"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="postal-code" className="block mt-3 text-sm font-medium text-gray-700">
                                                    Gender
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postal-code"
                                                    id="postal-code"
                                                    autoComplete="postal-code"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="street-address"
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 mt-4 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md bg-gradient-to-r from-fuchsia-800 to-indigo-900 py-2 px-4 text-sm font-medium text-white shadow-sm"
                                        >
                                            Submit
                                        </button>
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
