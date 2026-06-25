import { useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectProducts,
} from "../features/stockSlice";
import { ErrorCard, NotFoundCard } from "../components/shared/InfoCards";
import { TableSkeleton } from "../components/shared/Skeletons";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import DataTable from "../components/shared/table/data-table";
import { useState } from "react";
import { getProductColumns } from "../lib/Table-columns";
import { ProductModal } from "../components/ProductModal";

export default function Products() {
  const { getStockData, deleteStockData } = useStockCall();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const products = useSelector(selectProducts);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleModalChange(isOpen) {
    setModalOpen(isOpen);
    setSelectedProduct(null);
  }

  function handleOpenEdit(product) {
    setSelectedProduct({
      ...product,
      brandId: product?.brandId?._id,
      categoryId: product?.categoryId?._id,
      quantity: product?.quantity?.toString(),
      name: product?.name,
    });
    setModalOpen(true);
  }

  async function handleDelete(productId) {
    await deleteStockData("products", productId);
  }

  const columns = getProductColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
  });

  useEffect(() => {
    getStockData("products");
  }, []);

  return (
    <section className="space-y-4 pt-3 px-5">
      <div className="rounded-md border">
        <div className="flex h-full flex-1 flex-col gap-8 p-8">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Products
              </h2>
              <p className="text-muted-foreground">
                Track and manage all products transactions by brand, product,
                quantity, price and amount.
              </p>
            </div>
          </div>
          {error && <ErrorCard error={error} />}

          {isLoading ? (
            <TableSkeleton />
          ) : products.length === 0 ? (
            <NotFoundCard />
          ) : (
            <DataTable
              data={products}
              columns={columns}
              onAddNew={() => handleModalChange(true)}
              searchPlaceholder="Search product name, brand, category and quantity.."
              searchableFields={[
                "brandId.name",
                "categoryId.name",
                "quantity",
                "name",
              ]}
            />
          )}
        </div>
      </div>
      <ProductModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        selectedProduct={selectedProduct}
      />
    </section>
  );
}
