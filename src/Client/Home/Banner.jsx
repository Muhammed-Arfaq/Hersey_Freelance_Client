import React from 'react'
import pic1 from '../../assets/img/designing.jpeg'
import pic2 from '../../assets/img/delivery.jpeg'
import pic3 from '../../assets/img/cake.jpeg'
import pic4 from '../../assets/img/electrician.png'
import pic5 from '../../assets/img/plumber.jpeg'
import pic6 from '../../assets/img/repair.jpeg'
import pic7 from '../../assets/img/driver.jpeg'

import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast'

export default function Banner() {
  return (
    <>
      <Navbar/>
      <section className="relative w-full h-full py-80">
      <Toaster/>
        <div className="absolute top-0 w-full h-full bg-no-repeat bg-full">
          <div className="relative overflow-hidden bg-white">
            <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
              <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div className="sm:max-w-lg">
                  <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Have Access To A Vast Pool Of Freelance Talent.
                  </h1>
                  <p className="mt-4 text-xl text-gray-500">
                    Anytime, Anywhere, Anyone
                  </p>
                </div>
                <div>
                  <div className="mt-10">
                    {/* Decorative image grid */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                    >
                      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                              <img
                                src={pic1}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src={pic2}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src={pic3}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src={pic4}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src={pic5}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src={pic6}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src={pic7}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/allGigs"
                      className="inline-block rounded-md border border-transparent bg-gradient-to-r from-purple-900 to-indigo-600 py-3 px-8 text-center font-medium text-white transform transition hover:scale-95 duration-300 ease-in-out"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

