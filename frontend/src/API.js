import axios from "axios";
// import web3 from "./web3";

const api = axios.create({ baseURL: "http://localhost:4000" });

export async function castVote(address, option, unix, salt, qid) {
  await api
    .post("/api/v1/post/submitvote", {
      address: address,
      option: option,
      unix: unix,
      salt: salt,
      qid: qid,
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function postQuestion(content, optionzero, optionone, password) {
  await api
    .post("/api/v1/admin/postquestion", {
      content: content,
      optionzero: optionzero,
      optionone: optionone,
      salt: (Math.random() + 1).toString(36).substring(2),
      // password: web3.utils.soliditySha3(password),
    })

    .catch((error) => {
      console.log(error);
    });
}

export async function getCurrentQuestion(qid) {
  const res = await api.get("/api/v1/get/currentquestion", {
    params: {
      qid: qid,
    },
  });
  return res;
}

export async function getCurrentSalt(qid) {
  const res = await api.get("/api/v1/get/currentsalt", {
    params: {
      qid: qid,
    },
  });
  return res.data.salt;
}
export async function getHistoricalQuestions(qid) {
  const res = await api.get("/api/v1/get/history", {
    params: {
      qid: qid,
    },
  });
  return res;
}

export async function reveal(password, qid) {
  const res = await api.post("/api/v1/admin/reveal", {
    password: password,
    qid: qid,
  });
  return res;
}

export async function emergencyRepayBackend(qid) {
  const res = await api.post("/api/v1/admin/emergencyrepay", {
    qid: qid,
  });
  return res;
}
