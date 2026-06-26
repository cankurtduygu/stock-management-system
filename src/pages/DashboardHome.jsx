import React from "react";
import DashboardHomeCards from "../components/DashboardHomeCards";
import DashboardHomeAreaChart from "../components/DashboardHomeAreaChart";
import { useSelector } from "react-redux";
import {
  selectPurchases,
  selectPurchasesStatus,
  selectSales,
  selectSalesStatus,
} from "../features/stockSlice";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import {
  DashboardHomeAreaChartSkeleton,
  DashboardHomeCardsSkeleton,
} from "../components/shared/Skeletons";

export default function DashboardHome() {
  const { getStockResources } = useStockCall();
  const salesStatus = useSelector(selectSalesStatus);
  const purchaseStatus = useSelector(selectPurchasesStatus);
  const sales = useSelector(selectSales);
  const purchases = useSelector(selectPurchases);

  useEffect(() => {
    const requiredResources = ["sales", "purchases"];

    getStockResources(requiredResources);
  }, []);

  const showSalesLoadingSkeleton =
    salesStatus === "idle" || (salesStatus === "loading" && sales.length === 0);
  const showPurchaseLoadingSkeleton =
    purchaseStatus === "idle" ||
    (purchaseStatus === "loading" && purchases.length === 0);
  const showLoadingSkeleton =
    showSalesLoadingSkeleton || showPurchaseLoadingSkeleton;
    
  return (
    <section className="space-y-5 pt-3 px-4 lg:px-6">
      {showLoadingSkeleton ? (
        <>
          <DashboardHomeCardsSkeleton />
          <DashboardHomeAreaChartSkeleton />
        </>
      ) : (
        <>
          <DashboardHomeCards sales={sales} purchases={purchases} />
          <DashboardHomeAreaChart sales={sales} purchases={purchases} />
        </>
      )}
    </section>
  );
}
