import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import {
  selectError,
  selectBrands,
  selectLoading,
} from "../features/stockSlice";
import { BrandCardsSkeleton } from "../components/shared/Skeletons";
import { ErrorCard, NotFoundCard } from "../components/shared/InfoCards";
import { useState } from "react";
import BrandCard from "../components/BrandCard";
import { BrandModal } from "../components/BrandModal";

export default function Brands() {
  const { getStockData } = useStockCall();
  const brands = useSelector(selectBrands);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    getStockData("brands");
  }, []);

  function handleModalChange(isOpen) {
    setModalOpen(isOpen);
    setSelectedBrand(null)
  }
  function handleOpenEdit(brand) {
    setSelectedBrand(brand);
    setModalOpen(true);
  }

  return (
    <section className="space-y-4 pt-3 px-5">
      <BrandModal open={modalOpen} onOpenChange={handleModalChange} selectedBrand={selectedBrand} />

      {error && <ErrorCard error={error} />}

      {isLoading ? (
        <BrandCardsSkeleton />
      ) : brands.length === 0 ? (
        <NotFoundCard />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} onEdit={handleOpenEdit} />
          ))}
        </div>
      )}
    </section>
  );
}
