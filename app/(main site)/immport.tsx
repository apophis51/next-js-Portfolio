import axios from "axios";

axios.get("http://localhost:1337/api/restaurants").then((response) => {
  console.log(response);
});