import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";

import { useSelector } from "react-redux";
import {
  selectError,
  selectFirms,
  selectLoading,
} from "../features/stockSlice";
import FirmCard from "../components/FirmCard";
import { FirmCardsSkeleton } from "../components/shared/Skeletons";
import { ErrorCard, NotFoundCard } from "../components/shared/InfoCards";
import { FirmModal } from "../components/FirmModal";
import { useState } from "react";

export default function Firms() {

  const [modalOpen, setModalOpen] = useState(false); //Modalin açılıp kapanmasını kontrol etmek için bir state oluşturduk. Başlangıçta false yani kapalı durumda olacak.
  const [selectedFirm, setSelectedFirm] = useState(null);

  const { getStockData } = useStockCall();
  const firms = useSelector(selectFirms);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  //   console.log(firms);

  useEffect(() => {
    getStockData("firms");
  }, []);

  function handleModalChange(isOpen){
    setModalOpen(isOpen);
    setSelectedFirm(null);
  }

  function handleOpenEdit(firm) {
    setSelectedFirm(firm);
    setModalOpen(true);
  }

  return (
    <section className="space-y-4 pt-3 px-5">
    <FirmModal open={modalOpen} onOpenChange={handleModalChange} selectedFirm={selectedFirm} />

      {error && <ErrorCard error={error} />}

      {isLoading ? (
        <FirmCardsSkeleton />
      ) : firms.length === 0 ? (
        <NotFoundCard />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {firms.map((firm) => (
            <FirmCard key={firm._id} firm={firm} onEdit={handleOpenEdit} />
          ))}
        </div>
      )}
    </section>
  );
}
