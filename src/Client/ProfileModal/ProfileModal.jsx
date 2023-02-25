import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { switchOff } from "../../Redux/Reducer/profileModal";
import CloseIcon from '@mui/icons-material/Close';
import { updateUser } from "../../API";
import { useNavigate } from "react-router-dom";

export default function ProfileModal() {
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState("")
    const [location, setLocation] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const token = localStorage.getItem("jwt")

    function converToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const onUpload = async (e) => {
        const base64 = await converToBase64(e.target.files[0]);
        setProfilePhoto(base64);
    };

    const show = useSelector((state) => state.editProfile.show)
    const data = useSelector((state) => state.editProfile.data)

    const editUserProf = (e) => {
        e.preventDefault()
        updateUser(userName, dob, gender, phone, location, profilePhoto, token).then(() => {
            window.location.reload(false)
        })
    }

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
                                <form className="bg-gray-100 px-4 pt-5 pb-4 sm:p-10 sm:pb-4">
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
                                                    placeholder={data?.fullName}
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
                                                    value={userName}
                                                    onChange={(e) => {
                                                        setUserName(e.target.value)
                                                    }}
                                                    placeholder={data?.userName}
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
                                                    placeholder={data?.email}
                                                    autoComplete="email"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                                    D.O.B
                                                </label>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    id="dob"
                                                    value={dob}
                                                    onChange={(e) => {
                                                        setDob(e.target.value)
                                                    }}
                                                    placeholder={data?.dob}
                                                    autoComplete="dob"
                                                    className="mt-5 block w-60 h-9 rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="city" className="block mt-3 text-sm font-medium text-gray-700">
                                                    Mobile
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        setPhone(e.target.value)
                                                    }}
                                                    placeholder={data?.phone}
                                                    autoComplete="address-level2"
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
                                                    value={gender}
                                                    onChange={(e) => {
                                                        setGender(e.target.value)
                                                    }}
                                                    placeholder={data?.gender}
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
                                                    value={location}
                                                    onChange={(e) => {
                                                        setLocation(e.target.value)
                                                    }}
                                                    placeholder={data?.location}
                                                    autoComplete="street-address"
                                                    className="mt-5 block w-full rounded-lg border-gray-300 shadow-md border-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6">
                                                <div class="grid grid-cols-1 space-y-2">
                                                    <label class="text-sm font-bold text-gray-500 tracking-wide">Profile Photo</label>
                                                    <div class="flex items-center justify-center w-full">
                                                        <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-28 p-10 group text-center">
                                                            <div class="h-full w-full text-center flex flex-col justify-center items-center">
                                                                <img src={ profilePhoto } className="h-16 rounded-lg" />
                                                                <p class="pointer-none text-gray-500 "><span class="text-base font-bold cursor-pointer">Upload</span> your profile photo  <br /></p>
                                                            </div>
                                                            <input type="file" class="hidden" onChange={onUpload}/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 mt-4 text-right sm:px-6">
                                        <button
                                            onClick={editUserProf}
                                            type="submit"
                                            className="inline-flex justify-center rounded-md bg-gradient-to-r from-fuchsia-800 to-indigo-900 py-2 px-4 text-sm font-medium text-white shadow-sm"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
