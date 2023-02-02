import React from 'react'
import Banner from './Banner'
import Detail from './Detail'
import Gigs from './Gigs'

function Home() {
  return (
    <div>
        <Banner/>
        <Detail/>
        <Gigs heading={"Featured Products"}/>
        <Gigs heading={"Featured Services"}/>
    </div>
  )
}

export default Home