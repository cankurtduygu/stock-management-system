import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import {
  selectError,
  selectFirms,
  selectFirmsStatus,
} from "../features/stockSlice";
import FirmCard from "../components/FirmCard";
import { FirmCardsSkeleton } from "../components/shared/Skeletons";
import { ErrorCard, NotFoundCard } from "../components/shared/InfoCards";
import { FirmModal } from "../components/FirmModal";
import { useState } from "react";
import { useEffectEvent } from "react";

export default function Firms() {
  const { getStockData } = useStockCall();
  const firms = useSelector(selectFirms);
  const firmsStatus = useSelector(selectFirmsStatus);
  const error = useSelector(selectError);
  //   console.log(firms);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);
  // console.log(selectedFirm);

  const getData = useEffectEvent(() => {
    getStockData("firms");
  });

  useEffect(() => {
    getData()
  }, []);

  function handleModalChange(isOpen) {
    setModalOpen(isOpen);
    setSelectedFirm(null)
  }
  function handleOpenEdit(firm) {
    setSelectedFirm(firm);
    setModalOpen(true);
  }

    const showLoadingSkeleton =
    firmsStatus === "idle" ||
    (firmsStatus === "loading" && firms.length === 0);

  return (
    <section className="space-y-4 pt-3 px-5">
      <FirmModal open={modalOpen} onOpenChange={handleModalChange} selectedFirm={selectedFirm} />

      {error && <ErrorCard error={error} />}

      {showLoadingSkeleton ? (
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
