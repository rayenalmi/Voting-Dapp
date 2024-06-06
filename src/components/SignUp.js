import { useState } from "react";
import { ethers } from "ethers";
import Voting from "../../ignition/deployments/chain-4002/artifacts/VotingModule#Voting.json";

export function SignUp() {

    const votingAddress = "0x87F044c3334BAefDFE44d5d47CeA83B7590d649F";

    async function requestAccounts() {
        await window.etherum.request({ method: 'eth_requestAccounts' });
    }

    async function fetchTest() {
        // if MetaMast Exist 
        if (typeof window.etherum !== "undefined") {
            const provider = new ethers.provider.Web3Provider(window.etherum);
            const contract = new ethers.Contract(votingAddress, Voting.abi, provider);

            try {
                const data = await contract.login();
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
    }

    async function FetchRegister() {
        if (typeof window.etherum !== "undefined") {
            requestAccounts();

            const provider = new ethers.provider.Web3Provider(window.etherum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
            // useState input to pass message 
            let exempleName = "rayen";
            const register = await contract.register(exempleName);
            // setName("")
            await register.wait();

        }
    }

    return (
        <>
            Sign Up
        </>
    );

}