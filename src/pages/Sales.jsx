import { useSelector } from "react-redux";
import {
  selectError,
  selectSales,
  selectSalesStatus,
} from "../features/stockSlice";
import { ErrorCard, NotFoundCard } from "../components/shared/InfoCards";
import { TableSkeleton } from "../components/shared/Skeletons";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import DataTable from "../components/shared/table/data-table";
import { useState } from "react";
import { getSaleColumns } from "../lib/Table-columns";
import { SaleModal } from "../components/SaleModal";
import { useEffectEvent } from "react";

export default function Sales() {
  const { getStockData, deleteStockData } = useStockCall();
  const error = useSelector(selectError);
  const salesStatus = useSelector(selectSalesStatus);
  const sales = useSelector(selectSales);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  function handleModalChange(isOpen) {
    setModalOpen(isOpen);
    setSelectedSale(null);
  }

  function handleOpenEdit(sale) {
    setSelectedSale({
      ...sale,
      brandId: sale?.brandId?._id,
      productId: sale?.productId?._id,
      quantity: sale?.quantity?.toString(),
      price: sale?.price?.toString(),
    });
    setModalOpen(true);
  }

  async function handleDelete(saleId) {
    await deleteStockData("sale", saleId);
  }

  const columns = getSaleColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
  });

  const getData = useEffectEvent(() => {
    getStockData("sales");
  });

  useEffect(() => {
    getData();
  }, []);

  const showLoadingSkeleton =
    salesStatus === "idle" ||
    (salesStatus === "loading" && sales.length === 0);

  return (
    <section className="space-y-4 pt-3 px-5">
      <div className="rounded-md border">
        <div className="flex h-full flex-1 flex-col gap-8 p-8">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold tracking-tight">Sales</h2>
              <p className="text-muted-foreground">
                Track and manage all sales transactions by brand, product,
                quantity, price and amount.
              </p>
            </div>
          </div>
          {error && <ErrorCard error={error} />}

          {showLoadingSkeleton ? (
            <TableSkeleton />
          ) : sales.length === 0 ? (
            <NotFoundCard />
          ) : (
            <DataTable
              data={sales}
              columns={columns}
              onAddNew={() => handleModalChange(true)}
              searchPlaceholder="Search brand, product, price and quantity.."
              searchableFields={[
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
      <SaleModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        selectedSale={selectedSale}
      />
    </section>
  );
}
