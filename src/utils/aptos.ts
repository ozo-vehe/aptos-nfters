import {Account, Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const ADDRESS = "e9561c63bdd858e5d407e6924b71c52bbb87d04e131d52367b434b594df1e3da";
const APTOS_CONTRACT = `${ADDRESS}::Marketplace`;


const config = new AptosConfig({network: Network.DEVNET});
const aptos = new Aptos(config);
const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_TYPE = `0x1::coin::CoinStore<${APTOS_COIN}>`;
const API_KEY = "sk_staging_5ekxrH35ypjBjoGfx9oN44tJbb8LA9zbhZpoEJ5c17X8rjVFqwc27UQ2WVnMFrS5KNLmAiJjvL8FmhjjAuYJ4WwPdeN8ZAF6V16Bm3uvkroKgj7unfuB1nzgyYnxSzLEt6vs2LpqwK32tUFbGnm42eT1CKQg54LXHUSgfJjAddbNSyf1DKHJJjwBw4nYcyP8mc293gCDNGA2ma59RnpyifL9"

interface Collection {
  description: string,
  name: string,
  uri: string
}

export const getAccountBalance = async(address: string) => {
  const bal = await aptos.getAccountResource({
    accountAddress: address,
    resourceType: COIN_TYPE,
  })

  console.log(bal);

  return Number(bal.coin.value)
}

export const createCollection = async() => {
  const account = Account.generate();
  await aptos.fundAccount({
    accountAddress: account.accountAddress,
    amount: 100_000_000,
  })
  const module = await aptos.getAccountModule({accountAddress: ADDRESS, moduleName: "Marketplace"});
  console.log(module)
  const txn = await aptos.transaction.build.simple({
    sender: account.accountAddress,
    data: {
      function: `${APTOS_CONTRACT}::initialize_market`,
      functionArguments: [
        10,
        10,
        account.accountAddress
      ]
    }
  })
  console.log(txn);
  // const sign = await aptos.transaction.sign({
  //   signer: account.address,
  //   transaction: txn
  // })
  // console.log(sign);
  const signedTxn = await aptos.signAndSubmitTransaction({
    signer: account,
    transaction: txn,
  });

  const exeTxn = await aptos.waitForTransaction({transactionHash: signedTxn.hash});
  console.log(exeTxn);

  // console.log(signedTxn);
}

export const createListing = async(address: string, collectionName: string, tokenName: string, propertyVersion: number, amount: number, minPrice: number, startSec: number, expirationSec: number, withdrawExpirationSec: number, signAndSubmitTransaction) => {
    const txn:InputTransactionData = {
      data: {
        function: `${APTOS_CONTRACT}::creat_listing`,
        functionArguments: [address, collectionName, tokenName, propertyVersion, amount, minPrice, startSec, expirationSec, withdrawExpirationSec],
        typeArguments: [
          "0x1::aptos_coin::AptosCoin",
          "0x1::token::Token",
        ]
      }
    }
    console.log(txn);
  try {
    const res = await signAndSubmitTransaction(txn);
    console.log(res);
    const x = await aptos.waitForTransaction({ transactionHash: res.hash});
    console.log(x);
  } catch (error) {
    console.log(error)
  }
}

export const createNft = async (collection: Collection, account: any) => {
  const {name, uri, description} = collection;
  const accountObj = Account.generate();
  console.log(accountObj);
  console.log(name, uri, description);

  const createCollectionTransaction = await aptos.createCollectionTransaction({
    creator: accountObj,
    description: description,
    name: name,
    uri: uri
  });

  const committedTxn = await aptos.signAndSubmitTransaction({
    transaction: createCollectionTransaction,
    signer: accountObj,
  });

  console.log(committedTxn);
}