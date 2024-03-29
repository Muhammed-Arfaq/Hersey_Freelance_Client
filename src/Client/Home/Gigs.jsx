import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allProduct, allService } from "../../API";

export default function Gigs({ heading }) {

  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])

  const product = async () => {
    await allProduct().then((result) => {
      setProducts(result.data.data.products)
    }).catch(() => toast.error("Internal Error"));
  }

  const service = async () => {
    await allService().then((result) => {
      setServices(result.data.data.services);
    }).catch(() => toast.error("Internal Error"));
  }

  useEffect(() => {
    product(),
      service()
  }, [])


  return (
    <>
      <div className="relative w-5/6 flex flex-col min-w-0 mb-6 break-words bg-gray-50 rounded-2xl bg-clip-border m-auto p-auto border-0 shadow-2xl">
        <h1 className="flex py-5 md:px-10 px-5 md:mx-20 mx-5 font-bold text-2xl text-gray-800">
          {heading}
        </h1>
        {heading == 'Featured Products' ?
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            {products.map((product) => (
            <div className="flex flex-nowrap md:ml-10 ml-10">
              <div class="max-w-md w-72 bg-gray-100 shadow-xl transform transition hover:scale-95 duration-300 ease-in-out rounded-xl p-6 mr-5">
                <div class="flex flex-col ">
                  <div class="">
                    <div class="relative h-62 w-full mb-3">
                      <div class="absolute flex flex-col top-0 right-0 p-3">
                        {/* <button class="transition ease-in duration-300 bg-gradient-to-r from-slate-900 to-slate-700  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg></button> */}
                      </div>
                      <img src={product?.image} alt="Just a flower" class="w-56 h-48 object-cover rounded-2xl" />
                    </div>
                    <div class="flex-auto justify-evenly">
                      <div class="flex flex-wrap ">
                        <div class="w-full flex-none text-sm flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span class="text-gray-800 whitespace-nowrap mr-3 font-semibold">4.60</span>
                        </div>
                        <div class="flex items-center w-full justify-between min-w-0 ">
                          <h1 class="text-lg mr-auto cursor-pointer text-black hover:text-gray-700 font-semibold truncate mb-1">{product.title}</h1>
                        </div>
                      </div>
                      <div class="text-xl text-black font-bold mt-1">₹{product?.price}</div>
                      <div class="flex space-x-2 text-sm font-medium justify-start mt-3">
                        <Link to="/singleGig" state={product?._id} class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-lg hover:bg-gray-900 ">
                          <span>View</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
               ))}
          </div>

          :


          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          {services.map((service) => (
            <div className="flex flex-nowrap md:ml-10 ml-10">
              <div class="max-w-md w-64 bg-gray-100 shadow-xl transform transition hover:scale-95 duration-300 ease-in-out rounded-xl p-6">
                <div class="flex flex-col ">
                  <div class="">
                    <div class="relative h-62 w-full mb-3">
                      <div class="absolute flex flex-col top-0 right-0 p-3">
                        {/* <button class="transition ease-in duration-300 bg-gradient-to-r from-slate-900 to-slate-700  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg></button> */}
                      </div>
                      <img src={service.image} alt="Just a flower" class=" w-56 h-48 object-cover rounded-2xl" />
                    </div>
                    <div class="flex-auto justify-evenly">
                      <div class="flex flex-wrap ">
                        <div class="w-full flex-none text-sm flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span class="text-gray-800 whitespace-nowrap mr-3 font-semibold">4.60</span>
                        </div>
                        <div class="flex items-center w-full justify-between min-w-0 ">
                          <h1 class="text-lg mr-auto cursor-pointer text-black hover:text-gray-700 font-semibold truncate mb-1">{service.title}</h1>
                        </div>
                      </div>
                      <div class="text-xl text-black font-bold mt-1">₹{service?.price}</div>
                      <div class="flex space-x-2 text-sm font-medium justify-start mt-3">
                        <Link to="/singleGig" state={service?._id} class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-lg hover:bg-gray-900 ">
                          <span>View</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                    ))}
          </div>
        }
      </div>
    </>
  );
}
