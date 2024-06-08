import { useState } from "react";
import Sidebar from "../Sidebar";


export function ConsultVoting() {

    const [votes, setVotes] = useState({});

    const listItems = votes
        .map(vote =>
            <tr key={vote.id}>
                <td>{vote.Name}</td>
                <td> 12 </td>
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