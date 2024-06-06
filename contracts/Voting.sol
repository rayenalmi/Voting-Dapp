// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Voting {
    // Structure to represent a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    uint id = 0;
    // all users in platform
    mapping(address => bool) private registered;
    mapping(address => string) private usernames;

    event UserRegistered(address user, string username);
    event UserLoggedIn(address user);
    event UserCondidate(address user, string username);

    // Mapping of voter addresses to their vote status
    mapping(address => bool) public voters;
    mapping(address => bool) public condidatesapplied;

    // Array of candidates
    Candidate[] public candidates;

    // Constructor to add candidates
    constructor() {}

    function makeMeCondidate() public {
        require(!condidatesapplied[msg.sender], "User already a conndidate.");
        condidatesapplied[msg.sender] = true;

        candidates.push(
            Candidate({id: id, name: usernames[msg.sender], voteCount: 0})
        );
        id++;
        console.log(" %s with address %s", usernames[msg.sender], msg.sender);
        emit UserCondidate(msg.sender, usernames[msg.sender]);
    }

    function register(string memory username) public {
        require(!registered[msg.sender], "User already registered.");
        registered[msg.sender] = true;
        usernames[msg.sender] = username;
        console.log("register %s as %s ", msg.sender, username);
        emit UserRegistered(msg.sender, username);
    }

    function login() public {
        require(registered[msg.sender], "User not registered.");
        emit UserLoggedIn(msg.sender);
    }

    function getUsername(address user) public view returns (string memory) {
        require(registered[user], "User not registered.");
        return usernames[user];
    }

    function getTest() public pure returns (string memory) {
        return "Test Message";
    }

    // Function to vote for a candidate
    function vote(uint _candidateId) public {
        // Ensure the voter has not voted before
        require(!voters[msg.sender], "You have already voted.");

        // Ensure the candidate id is valid
        require(
            _candidateId >= 0 && _candidateId < candidates.length,
            "Invalid candidate ID."
        );

        // Record the voter's choice and mark them as having voted
        voters[msg.sender] = true;

        console.log(
            " %s vote to %s",
            msg.sender,
            candidates[_candidateId].name
        );
        // Increment the candidate's vote count
        candidates[_candidateId].voteCount++;
    }

    // Function to get the total number of candidates
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    // Function to get a candidate's details
    function getCandidate(
        uint _candidateId
    ) public view returns (string memory name, uint voteCount) {
        require(
            _candidateId >= 0 && _candidateId < candidates.length,
            "Invalid candidate ID."
        );
        Candidate storage candidate = candidates[_candidateId];
        return (candidate.name, candidate.voteCount);
    }
}
