import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import BreadCrumb from "../components/shared/BreadCrumb";

export default function Brands() {
  const { getStockData } = useStockCall();

  useEffect(() => {
    getStockData("brands");
  }, []);

  return (
    <div>
    </div>
  );
}
