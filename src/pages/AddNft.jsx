import {useState} from 'react';
// import { createListing } from '../utils/aptos';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";

const ADDRESS = "e9561c63bdd858e5d407e6924b71c52bbb87d04e131d52367b434b594df1e3da";
const APTOS_CONTRACT = `${ADDRESS}::Marketplace`;
const config = new AptosConfig({network: Network.DEVNET});
const aptos = new Aptos(config);

const AddNft = () => {
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    image: null,
  })
  const { connected, account, signAndSubmitTransaction } = useWallet();

  const create = async () => {
    // const data = {
    //   name: "Example",
    //   description: "Example collection description",
    //   uri: "aptos.dev"
    // }
    const module = await aptos.getAccountModule({accountAddress: ADDRESS, moduleName: "Marketplace"});
    console.log(module);
    if (connected) {
      // const nft = await createListing(account.address, "Art", "Mona Lisa", 24, 5, 3, 30000, 100000, 130000, signAndSubmitTransaction);
      // console.log(nft);
      let data = [account.address, "Art", "Mona Lisa", 1, 2, 1, 30000, 100000, 130000]

      try {
        const res = await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: `${APTOS_CONTRACT}::creat_listing`,
            functionArguments: [...data],
            typeArguments: ["0x1::aptos_coin::AptosCoin"],
            // gasLimit: 100_000_000_000_000,
          }
        });
        console.log(res);
        const x = await aptos.waitForTransaction({ transactionHash: res.hash});
        console.log(x);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNftData({ ...nftData, [name]: value })
  }

  const handleImageUpload = (e) => {
    setNftData({ ...nftData, image: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add logic to submit NFT data to the marketplace
    console.log('NFT data submitted:', nftData)
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
      <button onClick={() => create()}>Add</button>
      <h2 className="text-2xl font-bold mb-6 text-center">Add NFT to Marketplace</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            NFT Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nftData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={nftData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
            Duration (in minutes)
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={nftData.duration}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price (ETH)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={nftData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-800 text-white font-bold py-3 px-4 rounded-[30px] hover:bg-purple-700 transition-all duration-400"
        >
          Add NFT
        </button>
      </form>
    </div>
  )
}

export default AddNft
