import type { NextPage } from "next";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { Contract, utils } from "ethers";
import {
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
} from "../../smart-contracts/Constants";

const Home: NextPage = () => {
  const [walletConnected, setWallletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const web3ModalRef = useRef();

  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );

      const tx = await nftContract.presaleMint({
        value: utils.parseEther("0.01"),
      });

      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Lion");
    } catch (err) {
      console.error(err);
    }
  };

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      const tx = await nftContract.mint({
        value: utils.parseEther("0.01"),
      });

      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Lion");
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWallletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      const tx = await nftContract.startPresale();

      setLoading(true);
      await tx.wait();
      setLoading(false);
      await checkIfPresaleStarted();
    } catch (err) {
      console.error(err);
    }
  };

  return <div></div>;
};

export default Home;
