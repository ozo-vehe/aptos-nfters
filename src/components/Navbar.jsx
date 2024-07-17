import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import AddressFormatter from "./AddressFormatter";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { getAccountBalance } from "../utils/aptos";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [balance, setBalance] = useState(0);
  // const loggedIn = false;

  const links = [
    {
      path: "/",
      name: "home",
      active: true,
    },
    {
      path: "/marketplace",
      name: "marketplace",
      active: false,
    },
    {
      path: "/resource",
      name: "resource",
      active: false,
    },
    {
      path: "/about",
      name: "about",
      active: false,
    },
  ];

  const { connected, account, disconnect } = useWallet();

  const editedAptosBalance = (bal) => {
    return bal / 100000000;
  };

  useEffect(() => {
    if (connected) {
      const getBalance = async () => {
        const bal = await getAccountBalance(account.address);
        const editedBal = editedAptosBalance(bal);

        setBalance(editedBal);
      };
      getBalance(account.address);
    }
  }, [connected, account]);

  return (
    <nav className="navbar border-b border-gray-100 lg:px-16 md:px-8 px-4">
      <div className="navbar-container flex flex-wrap items-center justify-between py-5">
        <Logo textStyle={"tracking-wide text-purple-800 text-2xl"} />

        {/* Desktop/Tablet View */}
        <div className="links min-w-[70%] lg:flex md:flex hidden items-center justify-between gap-4">
          <ul className="nav-menu flex items-center justify-center min-w-[300px] gap-4">
            {links.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link font-bold text-gray-900 capitalize px-2"
                      : "text-gray-600 capitalize px-2"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="search-bar border border-gray-400 flex items-center justify-center py-2 w-[250px] rounded-[30px] pr-4">
            <input
              type="text"
              className="search-input h-full w-full rounded-[30px] border-none outline-none text-[14px] px-5 placeholder:text-sm"
              placeholder="Search"
            />
            <img
              className="w-[25px] h-[25px] cursor-pointer"
              src="https://img.icons8.com/ios-glyphs/90/424242/search--v1.png"
              alt="search--v1"
            />
          </div>

          <div className="connect-btn flex">
            {connected ? (
              <>
                <Link
                  to="/add-nft"
                  className="min-w-[120px] text-center py-2 px-4 text-[16px] capitalize border border-purple-700 bg-purple-800 rounded-[30px] text-gray-50 hover:bg-purple-700 hover:text-gray-50 transition-all duration-400 mr-4"
                >
                  upload
                </Link>

                <div
                  className="min-w-[150px] flex gap-2 items-center justify-center py-2 px-4 text-[16px] capitalize border border-purple-700 rounded-[30px] text-gray-700 relative"
                  onClick={async () => {}}
                >
                  {/* Address Formatter */}
                  <AddressFormatter address={account.address} />
                  {/* Drop Down Icon */}
                  <img
                    className="w-[15px] h-[15px] cursor-pointer"
                    src={`https://img.icons8.com/ios-glyphs/90/374151/chevron-down.png`}
                    alt="chevron-down"
                    onClick={() => setShowDropDown(!showDropDown)}
                  />

                  {/* User actions e.g. logout, balance etc */}
                  <div
                    className={`absolute top-[42px] bg-gray-50 overflow-hidden z-10 right-0 w-full border border-gray-100 rounded-[8px] ${
                      showDropDown ? "block" : "hidden"
                    }`}
                  >
                    <ul className="flex text-[14px] montserrat py-2 flex-col items-center justify-center gap-2">
                      <li className="nav-item w-full text-center hover:font-[700]">
                        <Link to="/" className="nav-link text-gray-600">
                          My Profile
                        </Link>
                      </li>
                      <li className="nav-item w-full text-center hover:font-[700] text-gray-600 cursor-pointer">
                        Balance: {balance} APT
                      </li>
                      <li
                        className="nav-item w-full text-center hover:font-[700] text-gray-600 cursor-pointer"
                        onClick={async () => {
                          disconnect();
                          setShowDropDown(false);
                        }}
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <button
                className="w-[150px] py-2 px-4 text-[16px] capitalize border border-purple-700 rounded-[30px] text-gray-700 hover:bg-purple-700 hover:text-gray-50 transition-all duration-400 relative"
                onClick={async () => {}}
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-[30px] overflow-hidden wallet-connect opacity-0">
                  <WalletSelector />
                </div>
                Connect wallet{" "}
              </button>
            )}
          </div>
        </div>

        {/* Mobile view */}
        <div
          className="hambuger-menu cursor-pointer lg:hidden md:hidden flex"
          onClick={() => setActive(!active)}
        >
          <img
            className="w-[25px]"
            src="https://img.icons8.com/ios-filled/50/menu--v6.png"
            alt="menu--v6"
          />
        </div>
        <div
          className={`links w-full lg:hidden md:hidden flex flex-col items-center justify-center gap-4 overflow-hidden transition-all duration-500 ${
            active ? "h-[180px]" : "h-[0px]"
          }`}
        >
          <ul className="nav-menu flex mt-2 items-center justify-center min-w-[300px] gap-4">
            {links.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link font-bold text-gray-900 capitalize px-2"
                      : "text-gray-600 capitalize px-2"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="search-bar border border-gray-400 flex items-center justify-center py-2 w-[300px] rounded-[30px] pr-4">
            <input
              type="text"
              className="search-input h-full w-full rounded-[30px] border-none outline-none text-[14px] px-5 placeholder:text-sm"
              placeholder="Search"
            />
            <img
              className="w-[25px] h-[25px] cursor-pointer"
              src="https://img.icons8.com/ios-glyphs/90/424242/search--v1.png"
              alt="search--v1"
            />
          </div>

          <div className="connect-btn flex">
            {connected ? (
              <>
                <Link
                  to="/add-nft"
                  className="min-w-[120px] py-2 px-4 text-[16px] capitalize border border-purple-700 bg-purple-800 rounded-[30px] text-gray-50 hover:bg-purple-700 hover:text-gray-50 transition-all duration-400 mr-4"
                >
                  {" "}
                  upload{" "}
                </Link>

                <div
                  className="min-w-[150px] flex gap-2 items-center justify-center py-2 px-4 text-[16px] capitalize border border-purple-700 rounded-[30px] text-gray-700 relative"
                  onClick={async () => {}}
                >
                  {/* Address Formatter */}
                  <AddressFormatter address={account.address} />
                  {/* Drop Down Icon */}
                  <img
                    className="w-[15px] h-[15px] cursor-pointer"
                    src={`https://img.icons8.com/ios-glyphs/90/374151/chevron-down.png`}
                    alt="chevron-down"
                    onClick={() => setShowDropDown(!showDropDown)}
                  />

                  {/* User actions e.g. logout, balance etc */}
                  <div
                    className={`absolute top-[42px] bg-gray-50 overflow-hidden z-10 right-0 w-full border border-gray-100 rounded-[8px] ${
                      showDropDown ? "block" : "hidden"
                    }`}
                  >
                    <ul className="flex text-[14px] montserrat py-2 flex-col items-center justify-center gap-2">
                      <li className="nav-item w-full text-center hover:font-[700]">
                        <Link to="/" className="nav-link text-gray-600">
                          My Profile
                        </Link>
                      </li>
                      <li
                        className="nav-item w-full text-center hover:font-[700] text-gray-600 cursor-pointer"
                        onClick={async () => {
                          disconnect();
                          setShowDropDown(false);
                        }}
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <button
                className="w-[150px] py-2 px-4 text-[16px] capitalize border border-purple-700 rounded-[30px] text-gray-700 hover:bg-purple-700 hover:text-gray-50 transition-all duration-400 relative"
                onClick={async () => {}}
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-[30px] overflow-hidden wallet-connect opacity-0">
                  <WalletSelector />
                </div>
                Connect wallet{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
