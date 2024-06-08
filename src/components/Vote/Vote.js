import { useState } from "react";
import Sidebar from "../Sidebar";


export function Vote() {

    const [votes, setVotes] = useState({});
    const [isOpen, setIsOpen] = useState(false);


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const listItems = votes
        .map((vote,index) =>
            <tr key={index}>
                <td>{vote.Name}</td>
                <td>  <button onClick={() => { togglePopup(); }} type="button" class="btn btn-info">Vote</button> </td>
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
                                        {listItems}
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