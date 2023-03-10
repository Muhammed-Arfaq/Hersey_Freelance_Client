import React, { useEffect, useState } from "react";
import logo from "../../assets/img/Logo1.png";
import { useDispatch } from "react-redux";
import { switchOn } from "../../Redux/Reducer/profileModal";
import ProfileModal from "../ProfileModal/ProfileModal";
import Navbar from "../Home/Navbar";
import { Link } from "react-router-dom";
import { cancelOrder, reservedGig, userDetail } from "../../API";
import ReservedGigsModal from "../ReservedGigsModal/ReservedGigsModal";
import { orderModalOn } from "../../Redux/Reducer/viewReservedGigs";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import moment from "moment";

export default function Profile() {
    const dispatch = useDispatch()
    const token = localStorage.getItem("jwt")

    const [user, setUser] = useState("")
    const [reserved, setReserved] = useState([])

    const userDetails = async () => {
        await userDetail(token).then((result) => {
            setUser(result.data.data.profile)
        }).catch(() => toast.error("Internal Error"));
    }

    const reservedGigs = async () => {
        await reservedGig(token).then((result) => {
            setReserved(result.data.data.reserved);
        }).catch(() => toast.error("Internal Error"));
    }

    console.log(reserved);

    const cancelGig = (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel Order!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                cancelOrder(orderId, token).then(() => {
                    toast.success("Order Cancelled Successfully")
                    window.location.reload(false)
                }).catch(() => toast.error("Internal Error"));
            }
        })
    }

    useEffect(() => {
        userDetails()
        reservedGigs()
    }, [])


    return (
        <>
            <ReservedGigsModal />
            <ProfileModal />
            <Navbar />

            <div class="h-full bg-white p-8">
                <Toaster />
                <div class="bg-white rounded-lg shadow-xl pb-8">
                    <div class="w-full h-[250px]">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div class="flex flex-col items-center -mt-20">
                        <img src={user?.profilePhoto} class="w-40 h-48 object-cover border-4 border-white rounded-full" />
                        <div class="flex items-center space-x-2 mt-2">
                            <p class="text-2xl">{user?.userName}</p>
                            <span class="bg-gradient-to-r from-fuchsia-800 to-indigo-900 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        {/* <p class="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
                        <p class="text-sm text-gray-500">New York, USA</p> */}
                    </div>
                    <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                        <div class="flex items-center space-x-4 mt-2">
                            <button class="flex items-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100" onClick={() => dispatch(switchOn(user))}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                </svg>
                                <span>Edit Profile</span>
                            </button>
                            <Link to='/chat' class="flex items-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                </svg>
                                <span>Message</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div class="w-full h-fit flex flex-col 2xl:w-1/3 2xl:sticky top-0">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul class="mt-2 text-gray-700">
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Full name:</span>
                                    <span class="text-gray-700">{user?.fullName}</span>
                                </li>
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Birthday:</span>
                                    <span class="text-gray-700">{moment(user?.dob).format("ll")}</span>
                                </li>
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Joined:</span>
                                    <span class="text-gray-700">{moment(user?.date).format("lll")}</span>
                                </li>
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Gender:</span>
                                    <span class="text-gray-700">{user?.gender}</span>
                                </li>
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Mobile:</span>
                                    <span class="text-gray-700">{user?.phone}</span>
                                </li>
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Email:</span>
                                    <span class="text-gray-700">{user?.email}</span>
                                </li>
                                <li class="flex py-2">
                                    <span class="font-bold w-24">Location:</span>
                                    <span class="text-gray-700">{user?.location}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 class="text-xl text-gray-900 font-bold">Recently Reserved Gigs</h4>
                            <div class="relative px-4">
                                <div class="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                {reserved.length != 0 ? reserved.map((reserved) => (
                                    <div class="flex items-center w-full my-6 -ml-1.5">
                                        <div class="w-1/12 z-10">
                                            <div class="w-3.5 h-3.5 bg-gradient-to-r from-fuchsia-800 to-indigo-900 rounded-full"></div>
                                        </div>
                                        <div class="w-11/12">
                                            <p class="text-sm">
                                                {reserved?.title} <a href="#" class="text-blue-600 font-bold"> - {reserved?.status}</a>.</p>
                                            <p class="text-xs text-gray-500">{moment(reserved?.date).format("lll")}</p>
                                        </div>
                                    </div>
                                ))
                                    : <h1 className="font-mono font-bold text-2xl mt-12 flex justify-center text-black ">No Reservations</h1>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full 2xl:w-2/3">
                        <div className="relative h-screen flex flex-col min-w-0 mb-6 break-words bg-gray-50 rounded-2xl bg-clip-border border-0 shadow-2xl">
                            <h1 className="flex py-5 ml-8 font-bold text-xl text-gray-800">
                                All Reservations
                            </h1>
                            <div className="flex overflow-y-scroll hide-scroll-bar">
                                <div className="flex-auto px-0 pt-0 pb-2">
                                    <div className="p-0 overflow-x-auto">
                                        {reserved.length != 0 ?
                                            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                                <thead className="align-bottom">
                                                    <tr>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-base font-mono border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Order_ID</th>
                                                        <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-base font-mono border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Order Date</th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-base font-mono border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Amount</th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-base font-mono border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-base font-mono border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reserved?.map((orders) => (

                                                        <tr>
                                                            <td className="p-2 align-middle bg-transparent  whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1 justify-center">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 leading-normal text-sm cursor-pointer" onClick={() => dispatch(orderModalOn(orders))}>#{orders?._id}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
                                                                <p className="mb-0 font-semibold leading-tight text-center text-xs">{moment(orders?.date).format("lll")}</p>
                                                            </td>
                                                            <td className="p-2 text-center align-middle bg-transparent whitespace-nowrap shadow-transparent">
                                                                <span className="font-semibold leading-tight text-xs text-slate-400">₹{orders?.gigId?.price}</span>
                                                            </td>
                                                            <td className="p-2 text-center align-middle bg-transparent whitespace-nowrap shadow-transparent">
                                                                <span className="font-semibold leading-tight text-base">{orders?.status}</span>
                                                            </td>
                                                            <td className="p-2 align-middle text-center bg-transparent whitespace-nowrap shadow-transparent">
                                                                {orders?.status == 'Cancelled' ?
                                                                    <a><span className="bg-gradient-to-tl from-red-600 to-red-400 px-3 text-xs rounded-lg py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ">Cancelled</span></a>
                                                                    : orders?.status == 'Completed' ?
                                                                        <a><span className="bg-gradient-to-tl from-green-600 to-green-400 px-3 text-xs rounded-lg py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ">Completed</span></a>
                                                                        :
                                                                        <a><span className="bg-gradient-to-tl from-red-600 to-red-400 px-3 text-xs cursor-pointer rounded-lg py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white" onClick={() => cancelGig(orders?._id)}>Cancel</span></a>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            : <h1 className="font-mono font-bold text-2xl mt-72 flex justify-center text-black ">No Reservations</h1>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

            <footer aria-label="Site Footer" class="bg-white">
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div class="text-center sm:text-left">
                            <p class="text-lg font-medium text-gray-900">About Us</p>

                            <nav aria-label="Footer About Nav" class="mt-8">
                                <ul class="space-y-4 text-sm">
                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Company History
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Meet the Team
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Employee Handbook
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div class="text-center sm:text-left">
                            <p class="text-lg font-medium text-gray-900">Our Services</p>

                            <nav aria-label="Footer Services Nav" class="mt-8">
                                <ul class="space-y-4 text-sm">
                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Web Development
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Web Design
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Marketing
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Google Ads
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div class="text-center sm:text-left">
                            <p class="text-lg font-medium text-gray-900">Resources</p>

                            <nav aria-label="Footer Resources Nav" class="mt-8">
                                <ul class="space-y-4 text-sm">
                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Online Guides
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Conference Notes
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Forum
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Downloads
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Upcoming Events
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div class="text-center sm:text-left">
                            <p class="text-lg font-medium text-gray-900">Helpful Links</p>

                            <nav aria-label="Footer Helpful Nav" class="mt-8">
                                <ul class="space-y-4 text-sm">
                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            FAQs
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="text-gray-700 transition hover:text-gray-700/75"
                                            href="/"
                                        >
                                            Support
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            class="group flex justify-center gap-1.5 sm:justify-start"
                                            href="/"
                                        >
                                            <span class="text-gray-700 transition group-hover:text-gray-700/75">
                                                Live Chat
                                            </span>

                                            <span class="relative -mr-2 flex h-2 w-2">
                                                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
                                                <span class="relative inline-flex h-2 w-2 rounded-full bg-gray-500"></span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div class="mt-16">
                        <ul class="flex justify-center gap-6 sm:justify-end">
                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                >
                                    <span class="sr-only">Facebook</span>
                                    <svg
                                        class="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                >
                                    <span class="sr-only">Instagram</span>
                                    <svg
                                        class="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                >
                                    <span class="sr-only">Twitter</span>
                                    <svg
                                        class="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                >
                                    <span class="sr-only">GitHub</span>
                                    <svg
                                        class="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                >
                                    <span class="sr-only">Dribbble</span>
                                    <svg
                                        class="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>

                        <div class="sm:flex sm:items-center sm:justify-between">
                            <div class="flex justify-center sm:justify-start sm:-mt-12">
                                <img src={logo} alt="" className="h-12 w-44" />
                            </div>

                            <p class="mt-10 text-center text-sm text-gray-500 sm:mt-5 sm:text-center">
                                Copyright &copy; 2022. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
