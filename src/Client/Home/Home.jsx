import React from 'react'
import Banner from './Banner'
import Detail from './Detail'
import Footer from './Footer'
import Gigs from './Gigs'
import Vendors from './Vendors'

function Home() {
  return (
    <div>
        <Banner/>
        <Detail/>
        <Gigs heading={"Featured Products"}/>
        <Gigs heading={"Top Services"}/>
        {/* <Vendors heading={"Most Popular Freelancer's"}/> */}
        <Footer/>
    </div>
  )
}

export default Home