import { useContext } from "react";
import DataProvider from "@/context/data/Provider";

function useGetData() {
  return useContext(DataProvider);
}

export default useGetData;
