import { apiConnector } from "../apiconnector";
import {toast} from 'react-hot-toast'
import { catalogData } from "../apis";

const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId}) 

        if(!response?.data?.success){
            throw new Error("Could not ftch category page data")
        }

        result = response?.data;
    }
    catch(err){
        console.log("Catalog page data api error - ", err)
        toast.error(err.message)
        result = err.response?.data
    }
    toast.dismiss(toastId);
    return result;
}

export default getCatalogPageData
