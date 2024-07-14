import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json"

import Sidebar from "../Sidebar";


export function Vote() {

    const votingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);


    const [votes, setVotes] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const history = useNavigate();


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


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


    const GetName = () => {
        try {
            contract.methods.getTest().call({ gas: 50000 }).then(console.log);
        } catch (error) {
            console.log(error.message);
        }

        try {
            console.log("data1");
            contract.methods.getUsernameOfSender().call({ from: account, gas: 50000 }).then(console.log);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Sidebar />

            <br /><br /><br />
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-11">
                        <div className='row'>
                            <div className="recent-orders">
                                <h2>Absence</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Number Vote</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {listItems} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={GetName} > Call  </button>
            </div>
        </>
    );
}