import Axios from "axios";

export const fetchProducts = (url) => Axios.get(url).then((res) => res.data);

export const saveProducts = async (url, itemId, item) => {
  try {
    console.log(`Request body: ${JSON.stringify(item)}`);
    let response;
    if (itemId) {
      response = await Axios.put(`${url}/${itemId}`, item);
    } else {
      response = await Axios.post(url, item);
    }
    console.log(`Response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(`SP ERROR: ${JSON.stringify(error)}`);
    return null;
  }
};

export const deleteProduct = async (itemId) => {
  try {
    console.log(`Param: ${JSON.stringify(url, itemId)}`);
    const response = await Axios.delete(`${url}/${itemId}`);
    alert("Producto eliminado");
    console.log(`Response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(`DP ERROR: ${JSON.stringify(error)}`);
    return null;
  }
};

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
