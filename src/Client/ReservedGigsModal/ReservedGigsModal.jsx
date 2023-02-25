import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { orderModalOff } from "../../Redux/Reducer/viewReservedGigs";

export default function ReservedGigsModal() {
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch()
    const show = useSelector((state) => state.viewReservedGigs.show)
    const data = useSelector((state) => state.viewReservedGigs.data)
    console.log(data);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => dispatch(orderModalOff())}
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
                                <div className="text-end mr-2 mt-2 text-gray-600 cursor-pointer" onClick={() => dispatch(orderModalOff())}
                                    ref={cancelButtonRef}>
                                    <CloseIcon />
                                </div>
                                <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                                    <div class=" grid place-items-center font-mono">

                                        <div class="border-0 rounded-md ">
                                            <div class="md:flex px-4 leading-none max-w-4xl">
                                                <div class="flex-none ">
                                                    <img
                                                        src={data?.gigId?.image}
                                                        alt="pic"
                                                        class="h-72 w-56 object-cover rounded-lg shadow-2xl transform -mt-4  "
                                                    />
                                                </div>

                                                <div class="flex-col ">

                                                    <p class="pt-4 text-2xl ml-1 font-bold">{data?.gigId?.title}</p>
                                                    <hr class="hr-text" data-content="" />

                                                    <p class="hidden md:block px-4 my-4 text-sm text-left"><span className="font-semibold mr-3">Overview:</span>{data?.gigId?.overview}</p>

                                                    <p class="hidden md:block px-4 my-4 text-sm text-left"><span className="font-semibold mr-3">Requirements:</span>{data?.requirements}</p>

                                                    <p class="hidden md:block px-4 my-4 text-sm text-left"><span className="font-semibold mr-3">Status:</span>{data?.status}</p>

                                                    <p class="hidden md:block px-4 my-4 text-sm text-left"><span className="font-semibold mr-3">Amount:</span>₹{data?.gigId?.price}</p>

                                                </div>
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
