import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useStockCall from "../hooks/useStockCall";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function FirmDetail() {
  const { id } = useParams();
  const [firm, setFirm] = useState(null);
  const { getStockDataById } = useStockCall();

  useEffect(() => {
    const fetchDetailFirm = async () => {
      const res = await getStockDataById("firms", id);
      setFirm(res);
    };

    fetchDetailFirm();
  }, []);

  return (
    <Card className="relative  w-full  pt-0 flex shadow-lg">
      <img
        src={firm?.image}
        alt={firm?.name}
        className="relative z-20 aspect-14/5 w-full object-cover brightness-70  dark:brightness-60"
      />
      <CardHeader className={"flex-1"}>
        <div className="flex justify-between">
          <CardTitle>{firm?.name}</CardTitle>
          <Badge variant="outline">
            <Link to={`tel:${firm?.phone}`}>{firm?.phone}</Link>
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">
          {firm?.address}{" "}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex gap-2 flex-wrap">
        <Button size="sm" className="flex-1">
          <Link to={`/stock/firms/${firm?._id}`}>View Details</Link>
        </Button>
        <Button size="sm" variant="outline" className="">
          Edit
        </Button>
        <Button size="sm" variant="destructive" className="">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
