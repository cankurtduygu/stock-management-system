import { useSelector } from "react-redux";
import {
  selectError,
  selectPurchases,
  selectPurchasesStatus,
} from "../features/stockSlice";
import { ErrorCard, NotFoundCard } from "../components/shared/InfoCards";
import { TableSkeleton } from "../components/shared/Skeletons";
import useStockCall from "../hooks/useStockCall";
import { useEffectEvent, useEffect } from "react";
import DataTable from "../components/shared/table/data-table";
import { PurchaseModal } from "../components/PurchaseModal";
import { useState } from "react";
import { getPurchaseColumns } from "../lib/Table-columns";

export default function Purchases() {
  const { getStockData, deleteStockData } = useStockCall();
  const error = useSelector(selectError);
  const purchasesStatus = useSelector(selectPurchasesStatus);
  const purchases = useSelector(selectPurchases);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  // console.log(selectedPurchase);

  function handleModalChange(isOpen) {
    setModalOpen(isOpen);
    setSelectedPurchase(null);
  }

  function handleOpenEdit(purchase) {
    setSelectedPurchase({
      ...purchase,
      firmId: purchase?.firmId?._id,
      brandId: purchase?.brandId?._id,
      productId: purchase?.productId?._id,
      quantity: purchase?.quantity?.toString(),
      price: purchase?.price?.toString(),
    });
    setModalOpen(true);
  }

  async function handleDelete(purchaseId) {
    await deleteStockData("purchases", purchaseId);
  }

  const columns = getPurchaseColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
  });

  const getData = useEffectEvent(() => {
    getStockData("purchases");
  });

  useEffect(() => {
    getData();
  }, []);

  const showLoadingSkeleton =
    purchasesStatus === "idle" ||
    (purchasesStatus === "loading" && purchases.length === 0);

  return (
    <section className="space-y-4 pt-3 px-5">
      <div className="rounded-md border">
        <div className="flex h-full flex-1 flex-col gap-8 p-8">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Purchases
              </h2>
              <p className="text-muted-foreground">
                Track and manage all purchase transactions by firm, brand,
                product, quantity, and amount.
              </p>
            </div>
          </div>
          {error && <ErrorCard error={error} />}
          {showLoadingSkeleton ? (
            <TableSkeleton />
          ) : purchases.length === 0 ? (
            <NotFoundCard />
          ) : (
            <DataTable
              data={purchases}
              columns={columns}
              onAddNew={() => handleModalChange(true)}
              searchPlaceholder="Search firm, brand, product and quantity.."
              searchableFields={[
                "firmId.name",
                "brandId.name",
                "productId.name",
                "quantity",
                "amount",
                "price",
              ]}
            />
          )}
        </div>
      </div>
      <PurchaseModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        selectedPurchase={selectedPurchase}
      />
    </section>
  );
}
