import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, fetchSuccess } from "../features/stockSlice";
import { toast } from "sonner";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.message ||
      "Something went wrong"
    );
  };

  const getStockData = async (url) => {
    try {
      dispatch(fetchStart());
      const { data } = await axiosWithToken(`${url}?sort[createdAt]=desc`);
      //   console.log(data.data);
      // throw new Error('test error handling')
      dispatch(fetchSuccess({ url, data: data.data }));
    } catch (error) {
      const errMsg = getErrorMessage(error);
      dispatch(fetchFail(errMsg));
      console.log(error);
      toast.error("Data could not be loaded", { description: errMsg });
    }
  };

  // const getProFirBrand = async () => {
  //   try {
  //     await Promise.all([
  //       getStockData("products"),
  //       getStockData("firms"),
  //       getStockData("brands"),
  //     ]);
  //   } catch (error) {
  //     const errMsg = getErrorMessage(error);
  //     dispatch(fetchFail(errMsg));
  //     console.log(error);
  //     toast.error("Data could not be loaded", { description: errMsg });
  //   }
  // };

  // const getProBrand = async () => {
  //   try {
  //     await Promise.all([getStockData("products"), getStockData("brands")]);
  //   } catch (error) {
  //     const errMsg = getErrorMessage(error);
  //     dispatch(fetchFail(errMsg));
  //     console.log(error);
  //     toast.error("Data could not be loaded", { description: errMsg });
  //   }
  // };

  // const getCatBrand = async () => {
  //   try {
  //     await Promise.all([getStockData("categories"), getStockData("brands")]);
  //   } catch (error) {
  //     const errMsg = getErrorMessage(error);
  //     dispatch(fetchFail(errMsg));
  //     console.log(error);
  //     toast.error("Data could not be loaded", { description: errMsg });
  //   }
  // };

  const getStockResources = async (resources) => {
    try {
      await Promise.all(resources.map((resource) => getStockData(resource)));
    } catch (error) {
      const errMsg = getErrorMessage(error);
      dispatch(fetchFail(errMsg));
      console.log(error);
      toast.error("Data could not be loaded", { description: errMsg });
    }
  };

  const getStockDataById = async (url, id) => {
    try {
      dispatch(fetchStart());
      const { data } = await axiosWithToken(`${url}/${id}`);
      console.log(data.data);
      return { ...data.data };
    } catch (error) {
      const errMsg = getErrorMessage(error);
      dispatch(fetchFail(errMsg));
      console.log(error);
    }
  };

  const createStockData = async (url, createdInfo) => {
    try {
      await axiosWithToken.post(`${url}`, createdInfo);
      toast.success("Created Successfully!");
      await getStockData(url);
      return true;
    } catch (error) {
      const errMsg = getErrorMessage(error);
      dispatch(fetchFail(errMsg));
      console.log(error);
      toast.error("Create Failed!", { description: errMsg });
      return false;
    }
  };

  const updateStockData = async (url, id, updatedInfo) => {
    try {
      await axiosWithToken.put(`${url}/${id}`, updatedInfo);
      toast.success("Updated Successfully!");
      await getStockData(url);
      return true;
    } catch (error) {
      const errMsg = getErrorMessage(error);
      dispatch(fetchFail(errMsg));
      console.log(error);
      toast.error("Update Failed!", { description: errMsg });
      return false;
    }
  };

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`${url}/${id}`);
      toast.success("Deleted Successfully!");
      await getStockData(url);
    } catch (error) {
      console.log(error);
      const errMsg = getErrorMessage(error);
      dispatch(fetchFail(errMsg));
      toast.error("Delete Failed!", { description: errMsg });
    }
  };

  return {
    getStockData,
    getStockDataById,
    createStockData,
    updateStockData,
    deleteStockData,
    getStockResources,
    // getProFirBrand,
    // getProBrand,
    // getCatBrand,
  };
};

export default useStockCall;
