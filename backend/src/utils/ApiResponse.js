import { SUCCESS_MSG } from "./statusMessage.js";

class ApiResponse{
    constructor(
      statusCode,
      data,
      message = "success",
    ){
      this.statusCode = statusCode
      this.data = data
      this.message = message || SUCCESS_MSG[statusCode];
    }
}


export default ApiResponse
