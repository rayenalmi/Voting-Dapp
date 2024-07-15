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

    useEffect(() => {
        const GetAllCondidates = () => {

            contract.methods.getCandidates().call({ from: account, gas: 50000 }).then(function (result) {
                console.log(result);
                console.log(result[0]);

            });
        }
        if (web3 != null) {
            GetAllCondidates();
        }
    }, [account, contract.methods, web3])


    const GetName = () => {
        try {
            contract.methods.getTest().call({ gas: 50000 }).then(console.log);
        } catch (error) {
            console.log(error.message);
        }

        try {
            //contract.methods.getUsernameOfSender().call({ from: account, gas: 50000 }).then(console.log);
            contract.methods.getUsernameOfSender().call({ from: account, gas: 50000 }).then(function (result) {
                console.log(result);
            });
        } catch (error) {
            console.log(error.message);
        }

        /*
        // using the callback
        myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
            ...
        });
        */
    }


    const GetNumberCondidates = () => {

        // contract.methods.getCandidateCount().call({ gas: 50000 } , function(error, result){
        //     console.log(result)
        //  });

        contract.methods.getCandidateCount().call({ from: account, gas: 50000 }).then(function (result) {
            const x = Number(result);
            console.log(x);
        });
    }


    const makeMeCondidate = () => {
        try {
            contract.methods.makeMeCondidate().send({ from: account, gas: 500000 })
                .then(function (receipt) {
                    console.log(receipt);
                    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                });

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
                <button onClick={makeMeCondidate} > Make me makeMeCondidate  </button>
                <button onClick={GetNumberCondidates} > get number GetNumberCondidates  </button>


            </div>
        </>
    );
}