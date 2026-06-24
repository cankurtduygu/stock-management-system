import { useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectSales,
} from "../features/stockSlice";
import { NotFoundCard } from "../components/shared/InfoCards";
import { PurchaseTableSkeleton } from "../components/shared/Skeletons";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import DataTable from "../components/shared/table/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "../components/shared/table/data-table-column-header";
import { format } from "date-fns";
import { Edit, Delete, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sales() {
  const { getStockData } = useStockCall();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const sales = useSelector(selectSales);
  // console.log(sales);
  useEffect(() => {
    getStockData("sales");
  }, []);

  return (
    <section className="space-y-4 pt-3 px-5">
      {error && <ErrorCard error={error} />}

      {isLoading ? (
        <PurchaseTableSkeleton />
      ) : sales.length === 0 ? (
        <NotFoundCard />
      ) : (
        <div className="rounded-md border">
          <div className="flex h-full flex-1 flex-col gap-8 p-8">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Sales
                </h2>
                <p className="text-muted-foreground">
                  Track and manage all sale transactions by ....
                </p>
              </div>
            </div>
            <DataTable
              data={sales}
              columns={columns}
              searchPlaceholder='Search brand, product and quantity..'
              searchableFields={[
                "brandId.name",
                "productId.name",
                "quantity",
                "amount",
                "price",
              ]}
            />
          </div>
        </div>
      )}
    </section>
  );
}

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Created At"
      />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => (row.brandId ? row.brandId.name : "N/A"),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Brand"
      />
    ),
  },
  {
    accessorKey: "product",
    accessorFn: (row) => (row.productId ? row.productId.name : "N/A"),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Product"
      />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Quantity"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Price"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Amount"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original;
      const firmId = sale?.firmId?._id ?? null;
      // console.log(firmId);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Edit
              <Edit className="ml-auto" />
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive">
              Delete
              <Delete className="text-destructive ml-auto" />
            </DropdownMenuItem>

            <DropdownMenuLabel>Links</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link to={`/stock/sales/${sale._id}`}>
                View sale details
              </Link>
            </DropdownMenuItem>

            {firmId ? (
              <DropdownMenuItem>
                <Link to={`/stock/firms/${firmId}`}>View Firm</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled>No firm available</DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(sale._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
