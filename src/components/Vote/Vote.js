import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json"

import Sidebar from "../Sidebar";


export function Vote() {

    const votingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);


    const [condidates, setCondidates] = useState({});




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
                setCondidates(result);
            });
        }
        if (web3 != null) {
            GetAllCondidates();
        }
    }, [account, web3, contract])


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
    }


    const GetNumberCondidates = () => {
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

    const VoteMe = useCallback((id) => {
        try {
            let voted = false;
            contract.methods.getUserVotedOrNot().call({ from: account, gas: 500000 })
                .then(function (receipt) {
                    console.log(receipt);
                    voted = receipt;
                });

            if (!voted) {
                contract.methods.makeMeCondidate().send({ from: account, gas: 500000 })
                    .then(function (receipt) {
                        console.log(receipt);
                    });

            }
            else 
            {
                console.log("user already voted");
            }


        } catch (error) {
            console.log(error.message);
        }
    }, [account, contract]);


    const listCondidates = condidates
        .map(cond =>
            <tr key={cond.id}>
                <td>{cond.name}</td>
                <td> {cond.voteCount} </td>
                <td> <button onClick={() => VoteMe(cond.id)}> Vote me </button> </td>
            </tr>
        );


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
                                        {listCondidates}
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