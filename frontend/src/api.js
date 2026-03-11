import axios from "axios"

export const uploadFile = async (file, email) => {

    const formData = new FormData()

    formData.append("file", file)
    formData.append("email", email)

    return axios.post("http://localhost:8000/analyze", formData)
}