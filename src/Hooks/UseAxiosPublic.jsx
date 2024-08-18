import axios from "axios";

const axiosPublic = axios.create({
    
    baseURL:"https://backend-ecommerce-tawny.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;