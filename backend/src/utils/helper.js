import ApiError from "./ApiError.js"


export const fieldNotFound = (field) => {
    if(!field) {
      throw new ApiError(400, `${field } not found`)
    }
}
