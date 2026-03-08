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
import { ErrorCard } from "../components/shared/InfoCards";

export default function Firms() {
  const { getStockData } = useStockCall();
  const firms = useSelector(selectFirms);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  //   console.log(firms);

  useEffect(() => {
    getStockData("firms");
  }, []);

  return (
    <section className="space-y-4 pt-3 px-5">
      {error && <ErrorCard error={error} />}

      {isLoading ? (
        <FirmCardsSkeleton />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {firms.map((firm) => (
            <FirmCard key={firm._id} firm={firm} />
          ))}
        </div>
      )}
    </section>
  );
}
