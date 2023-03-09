import React, { useEffect, useRef } from "react";

import { useState } from "react";
import logo from "../../assets/img/Logo1.png";
import team1 from "../../assets/img/team-2.jpg";
import './Chat.css'
import io from "socket.io-client";
import Navbar from "../Home/Navbar";
import { fetchMsg, messageCount, sndMsg, userConnections } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../Redux/Reducer/currentChat";

export default function Chat() {
    const dispatch = useDispatch()
    const currentChat = useSelector((state) => state.setCurrentChat.chatUser)
    const vendorId = currentChat?._id
    const vendorName = currentChat?.fullName
    const userId = localStorage.getItem("userId")

    const [message, setMessage] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [vendors, setVendors] = useState([])
    const [getCount, setGetCount] = useState([])
    const [msgCount, setMsgCount] = useState("")
    const token = localStorage.getItem("jwt");

    const getMessageCount = () => {
        messageCount(userId, token).then((result) => {
            setMsgCount(result.data.count);
            console.log(result.data);
        }).catch(err => console.log(err));
    }


    const socket = useRef();
    // const scrolRef = useRef();

    const getUserConnections = async () => {
        await userConnections(userId, token).then((result) => {
            setVendors(result.data.sortedUsers)
            setGetCount(result.data.connectionCount)
            console.log(result);
        }).catch(err => console.log(err));
    }

    // console.log(getCount);

    useEffect(() => {
        getMessageCount()
        getUserConnections()
    }, [])

    const handleSelect = (vendor) => {
        dispatch(setCurrentChat(vendor));
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ myself: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        const fetchMessages = async (vendor) => {
            if (vendor) {
                const token = localStorage.getItem("jwt");
                const { data } = await fetchMsg(vendorId, userId, token)
                setMessage(data);
                console.log(data);
            }
        };
        fetchMessages(currentChat._id);
    }, [message, currentChat._id]);

    // useEffect(() => {
    //     scrolRef.current.scrollIntoView({ behavior: "smooth" })
    // })

    useEffect(() => {
        if (currentChat._id !== "") {
            socket.current = io.connect("https://www.herseymensformals.ml/")
            console.log(userId);
            socket.current.emit("addUser", userId);
        }
    }, [userId])

    const sendmsg = async () => {
        const messages = {
            myself: true,
            message: inputMessage
        }

        socket.current.emit("send-msg", {
            to: currentChat._id,
            message: inputMessage
        });

        let token = localStorage.getItem('jwt')
        let data = {
            to: currentChat._id,
            from: userId,
            message: inputMessage
        }

        await sndMsg(data, token)
        setMessage(message.concat(messages))
        setInputMessage("")
    }

    useEffect(() => {
        arrivalMessage && setMessage((pre) => [...pre, arrivalMessage])
    }, [arrivalMessage])

    return (
        <>
            <Navbar />
            <div class="flex h-screen antialiased text-gray-800 ">
                <div class="flex flex-row h-full w-full overflow-x-hidden">
                    <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                        <div
                            class="flex flex-col items-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                        >
                            <div class="h-20 w-20 rounded-full object-cover overflow-hidden">
                                <img
                                    src={currentChat?.profilePhoto || team1}
                                    alt="Avatar"
                                    class="h-full w-full"
                                />
                            </div>
                            <div class="text-sm text-white font-semibold mt-2">{currentChat?.fullName || ""}</div>

                        </div>
                        <div class="flex flex-col mt-8">
                            <div class="flex flex-row items-center justify-between text-xs">
                                <span class="font-bold text-base">Messages</span>
                                <span
                                    class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
                                >{msgCount}</span>
                            </div>
                            <div class="flex flex-col space-y-1 mt-5 -mx-2 h-96 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                {vendors?.map((vendor) => (
                                    <button
                                        onClick={() => handleSelect(vendor)}
                                        class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                    >
                                        <div
                                            class="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
                                        >
                                            <img src={vendor?.profilePhoto || team1} className="rounded-lg" />
                                        </div>
                                        <div class="ml-2 text-sm font-semibold">{vendor?.fullName}</div>
                                        <div
                                            class="flex items-center justify-center ml-auto text-xs text-white bg-gray-500 h-4 w-4 rounded leading-none"
                                        >
                                            {getCount?.find((count) => count?.userId === vendor?._id)?.count || 0}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col flex-auto h-full p-6">
                        <div
                            class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                        >
                            <div class="flex flex-col h-full overflow-x-auto mb-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                <div class="flex flex-col h-full">
                                    <div class="grid grid-cols-12 gap-y-2">
                                        {message?.map((msg) =>
                                            msg?.myself ? (

                                                <div key={msg?._id} class="col-start-6 col-end-13 p-3 rounded-lg">
                                                    <div class="flex items-center justify-start flex-row-reverse">
                                                        <div
                                                            class="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-fuchsia-800 to-indigo-900 text-white flex-shrink-0"
                                                        >
                                                            <img
                                                                src={team1}
                                                                alt="Avatar"
                                                                class="h-full w-full rounded-lg"
                                                            />
                                                        </div>
                                                        <div
                                                            class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                        >
                                                            <div>{msg?.message}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            ) : (
                                                <div key={msg?.message} class="col-start-1 col-end-8 p-3 rounded-lg">
                                                    <div class="flex flex-row items-center">
                                                        <div
                                                            class="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-fuchsia-800 to-indigo-900 text-white flex-shrink-0"
                                                        >
                                                            <img
                                                                src={currentChat?.profilePhoto || team1}
                                                                alt="Avatar"
                                                                class="h-full w-full rounded-lg"
                                                            />
                                                        </div>
                                                        <div
                                                            class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                        >
                                                            <div>{msg?.message}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        {/* <div ref={scrolRef} /> */}
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={sendmsg}
                                class="flex flex-row items-center h-6 rounded-xl  w-full px-4"
                            >

                                <div class="flex-grow ml-4">
                                    <div class="relative w-full">
                                        <input
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            value={inputMessage}
                                            type="text"
                                            className="block w-full border-0 flex-1 rounded-lg sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <button type="submit" class="flex items-center justify-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                        <span>Send</span>
                                        <span class="ml-2">
                                            <svg
                                                class="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

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
