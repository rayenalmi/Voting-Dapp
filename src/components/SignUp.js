import { useEffect, useState } from "react";
import Web3 from "web3";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json"

export function SignUp() {

    const votingAddress = "0x87F044c3334BAefDFE44d5d47CeA83B7590d649F";
    const rpcUrl = "https://rpc.ankr.com/fantom_testnet";

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    setAccount(accounts[0]);
                });

            const contractInstance = new web3Instance.eth.Contract(Voting.abi, votingAddress);
            setContract(contractInstance);
        } else {
            console.log("MetaMask not detected");
        }
    }, []);


    async function requestAccounts() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }


    async function fetchTest() {
        if (contract && account) {
            try {
                const data = await contract.methods.login().call();
                console.log(data);
            } catch (error) {
                console.error(error);
                alert(error.data.message)
            }
        }
    }

    async function fetchRegister() {
        if (contract && account) {
            try {
                await contract.methods.register("rayen").send({ from: account });
                console.log("Registered successfully");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            Sign Up

            <div>
                <button onClick={fetchTest}>Login</button>
                <button onClick={fetchRegister}>Register</button>
            </div>

        </>
    );

}