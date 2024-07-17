import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/Marketplace";
import AddNft from "./pages/AddNft";
// import router from './router';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from 'petra-plugin-wallet-adapter';

const wallets = [new PetraWallet()];


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/marketplace",
        element: <Marketplace />
      },
      {
        path: "/add-nft",
        element: <AddNft />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    {/* <React.StrictMode> */}
      <RouterProvider router={router} />
    {/* </React.StrictMode>, */}
  </AptosWalletAdapterProvider>
);
