// import { useState, useEffect } from 'react'
// import axios from 'axios'
import Nfts from '../components/Nfts';

const Marketplace = () => {
  // const [nfts, setNfts] = useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   loadNfts()
  // }, [])

  // const loadNfts = async () => {
  //   try {
  //     // Simulated NFT data fetch
  //     const response = await axios.get('https://api.example.com/nfts')
  //     setNfts(response.data)
  //     setLoading(false)
  //   } catch (error) {
  //     console.error('Error loading NFTs:', error)
  //     setLoading(false)
  //   }
  // }

  // const buyNft = async (nft) => {
  //   // Implement buying logic here
  //   console.log('Buying NFT:', nft)
  // }

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="nft-marketplace bg-white lg:px-16 md:px-8 px-4 py-12">
      <h2 className="font-[900] uppercase text-5xl mb-2">nfts marketplace </h2>
      <p className="lg:text-lg md:text-lg text-[16px] capitalize">discover more nfts </p> 
      <Nfts />
    </div>
  )
}

export default Marketplace;
