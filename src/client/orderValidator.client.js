import axios from "axios"

export const postOrder = async (data) => {
    const options = {
        url: 'http://localhost:3001/v1/order', 
        method: 'POST',
        data,
        headers: { 
            "Content-Type": 'application/json'
        }
    }
    return await axios(options)
        .then((response)=>response)
        .catch(error=>{
            console.log(error.message)
            return error
        });
}

export default {
    postOrder
}