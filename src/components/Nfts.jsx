import { useState } from "react";
import Nft from "./Nft";
import { nfts } from "../utils/products";

const Nfts = () => {
  const [active, setActive] = useState("all");
  // const [nfts, setNfts] = useState([])
  // const [loading, setLoading] = useState(true)
  // const { walletAddress } = useSelector((state) => state.wallet)
  const filter = [
    { label: "All Category", value: "all" },
    { label: "Art", value: "art" },
    { label: "Music", value: "music" },
    { label: "Photography", value: "photography" },
    { label: "Sports", value: "sports" },
  ];

  // useEffect(() => {
  //   const fetchNfts = async () => {
  //     if (walletAddress) {
  //       try {
  //         const fetchedNfts = await getNftsForOwner(walletAddress)
  //         // setNfts(fetchedNfts)
  //       } catch (error) {
  //         console.error('Error fetching NFTs:', error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }
  //   }

  //   fetchNfts()
  // }, [walletAddress])

  // if (loading) {
  //   return <Spin size="large" />
  // }

  return (
    <>
      <div className="nft-filter">
        <ul className="flex flex-wrap items-center justify-start gap-4 mt-8 mb-16">
          {filter.map((item) => (
            <li
              key={item.value}
              onClick={() => setActive(item.value)}
              className={`montserrat filter-btn px-5 py-2 min-w-[70px] rounded-[32px] text-[14px] text-center cursor-pointer transition-all duration-400 font-[500] ${
                item.value === active
                  ? "bg-purple-800 hover:bg-purple-700 text-gray-50"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="nft-container flex flex-wrap gap-8 text-center justify-center">
        {nfts.map((nft) => (
          <Nft nft={nft} key={nft.id} />
        ))}
      </div>
    </>
  );
};

export default Nfts;
