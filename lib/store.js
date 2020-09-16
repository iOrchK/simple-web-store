import fetch from "node-fetch";
import Axios from "axios";

const api_url = "http://localhost:3001/products";

// Example of fetching data from an external API Endpoint
export async function getProducts() {
  try {
    const response = await Axios.get(api_url);
    console.log(response.data);
    return await sortData(response.data, "NameProduct");
  } catch (error) {
    console.error(`GP ERROR: ${JSON.stringify(error)}`);
    return [];
  }
}

export async function saveProducts(itemId, item) {
  try {
    console.log(`Request body: ${JSON.stringify(item)}`);
    let response;
    if (itemId) {
      response = await Axios.put(`${api_url}/${itemId}`, item);
    } else {
      response = await Axios.post(api_url, item);
    }
    console.log(`Response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(`SP ERROR: ${JSON.stringify(error)}`);
    return null;
  }
}

export async function deleteProduct(itemId) {
  try {
    console.log(`Param: ${JSON.stringify(itemId)}`);
    const response = await Axios.delete(`${api_url}/${itemId}`);
    alert("Producto eliminado");
    console.log(`Response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(`DP ERROR: ${JSON.stringify(error)}`);
    return null;
  }
}

// Sort data by date
async function sortData(data, key = "_id", op = "<") {
  return data.sort((a, b) => {
    if (`${a[key]} ${op} ${b[key]}`) {
      return 1;
    } else {
      return -1;
    }
  });
}
