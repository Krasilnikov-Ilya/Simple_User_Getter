import axios from "axios";

export default axios.create({
    baseURL: "http://77.50.236.203:4880",
    responseType: "json"
});