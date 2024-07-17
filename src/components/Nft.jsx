import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Nft = ({ nft }) => {
  const { image, name, price } = nft;
  return (
    <div className="nft-card p-4 rounded-[16px] bg-gray-50 w-[300px] min-h-[400px]">
      <div className="card-image border w-full h-[250px] rounded-[16px] overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>

      <div className="card-details mt-5">
        <h3 className="font-bold text-left text-lg">{name}</h3>
        <div className="price flex items-center justify-between my-2">
          <p className="text-purple-700 font-[900] text-[16px]">{price} ETH</p>
          <p>1 of 300</p>
        </div>

        <div className="card-action flex items-center justify-between border-t border-gray-200 pt-4 mt-5">
          <Link className="bg-gray-100 border border-gray-200 px-5 py-2 rounded-[32px] hover:bg-gray-200 transition-all duration-400" to="/">View Details</Link>
          <button className="bg-purple-800 px-5 py-2 rounded-[32px] text-gray-50 hover:bg-purple-700 transition-all duration-400">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Nft;

Nft.propTypes = {
  nft: PropTypes.object,
};
