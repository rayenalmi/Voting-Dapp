import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json"
import ImageIllustration from "../assets/image_illustration.jpg";
import Navbar from "./Navbar";


export function SignUp() {

    const votingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    //const rpcUrl = "https://rpc.ankr.com/fantom_testnet";

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [erroremessage, seterrormessage] = useState("");

    const [name, setName] = useState("");
    const history = useNavigate();



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


    async function login() {
        if (contract && account) {
            try {
                //const data = await contract.methods.login().call();
                const data = await contract.methods.login().send({ from: account });
                console.log(data);
                console.log(data.from);
                const data1 = await contract.methods.login().call(data.from);
                console.log(data1);

            } catch (error) {
                console.error(error);
                console.error(error.message);

                //alert(error.data.message)
            }
        }
    }



    async function fetchRegister() {
        if (contract && account) {
            try {
                if (name) {
                    await contract.methods.register(name).send({ from: account });
                    console.log("Registered successfully");
                    history("/SignUp")
                }

            } catch (error) {
                console.error(error);
            }
        }
    }


    const goToSign = (e) => {
        e.preventDefault();
        history("/SignIn");
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto mt-5 bg-white pb-5 pt-5 pe-5 px-5 mb-5 rounded-5">
                        <h1 className="mb-5">Register</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <img
                                        src={ImageIllustration}
                                        alt=""
                                        width="80%"
                                    />
                                </div>
                                <div className="col-6">
                                    <div className="container">

                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label
                                                    htmlFor="address"
                                                    className="form-label"
                                                    style={{ textAlign: "left" }}
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Address from MetaMask "
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label"
                                                    style={{ textAlign: "left" }}
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Name"
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {erroremessage !== "" ? (
                                            <p className="text-danger">{erroremessage}</p>
                                        ) : (
                                            ""
                                        )}

                                        <br />
                                        <div className="Search__actions">
                                            <button className="btn btn-custom rounded-5" type="submit">
                                                <div className="logo">
                                                    <div onClick={fetchRegister} className="logo logo-name"><span>New</span>User</div>
                                                </div>
                                            </button>
                                        </div>
                                        <br />
                                        <p onClick={goToSign} style={{ color: "#A68989" }}>
                                            Sign In
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}