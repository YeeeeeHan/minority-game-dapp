// import web3 from "./web3.js";
//
// const address = "0x4AFAAde41331e9C16D8c26917E38Ff3E53e43471";
//
// const abi = [
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_ticketPrice",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [],
//     name: "Qid",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//     ],
//     name: "commitMap",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "commitRevealError",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "emergencyRepay",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "gameMaster",
//     outputs: [
//       {
//         internalType: "address payable",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getPlayersNumber",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "add",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "option",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "unix",
//         type: "uint256",
//       },
//       {
//         internalType: "string",
//         name: "salt",
//         type: "string",
//       },
//     ],
//     name: "hasher",
//     outputs: [
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//     ],
//     stateMutability: "pure",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "length0",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "length1",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "optionNotCorrect",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "payoutLengthError",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "players",
//     outputs: [
//       {
//         internalType: "address payable",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         components: [
//           {
//             internalType: "address",
//             name: "_address",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "option",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "unix",
//             type: "uint256",
//           },
//           {
//             internalType: "string",
//             name: "salt",
//             type: "string",
//           },
//         ],
//         internalType: "struct MinorityGame.Vote[]",
//         name: "votes",
//         type: "tuple[]",
//       },
//     ],
//     name: "reveal",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "ticketPrice",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "unequalPlayerVoteLength",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "commitHash",
//         type: "bytes32",
//       },
//     ],
//     name: "vote",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
// ];
// export default new web3.eth.Contract(abi, address);
