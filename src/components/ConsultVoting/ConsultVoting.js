import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json"
import Sidebar from "../Sidebar";


export function ConsultVoting() {

    const votingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


    const [votes, setVotes] = useState({});
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);

    // intilize Web3 
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
                setVotes(result);
            });
        }
        if (web3 != null) {
            GetAllCondidates();
        }
    }, [account, web3, contract])



    const listCondidates =  votes
        .sort((a, b) => b.voteCount - a.voteCount)
        .map(cond =>
            <tr key={cond.id}>
                <td>{cond.name}</td>
                <td> {cond.voteCount} </td>
            </tr>
        );


    // const listItems = votes
    //     .map(vote =>
    //         <tr key={vote.id}>
    //             <td>{vote.Name}</td>
    //             <td> 12 </td>
    //         </tr>
    //     );


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
            </div>

        </>
    );
}