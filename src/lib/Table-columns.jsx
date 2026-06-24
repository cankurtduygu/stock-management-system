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
import { AlertDial } from "../components/shared/AlertDial";

export const getPurchaseColumns = ({ onEdit, onDelete }) => [
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
    accessorKey: "firm",
    accessorFn: (row) => (row.firmId ? row.firmId.name : "N/A"),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Firm"
      />
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
      const purchase = row.original;
      const firmId = purchase?.firmId?._id ?? null;
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

            <DropdownMenuItem onClick={() => onEdit(purchase)}>
              Edit
              <Edit className="ml-auto" />
            </DropdownMenuItem>

            <AlertDial
              title="Delete Purchase?"
              onConfirm={() => onDelete(purchase._id)}
            >
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
                <Delete className="text-destructive ml-auto" />
              </DropdownMenuItem>
            </AlertDial>

            <DropdownMenuLabel>Links</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link to={`/stock/purchases/${purchase._id}`}>
                View purchase details
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
              onClick={() => navigator.clipboard.writeText(purchase._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const getSaleColumns = ({ onEdit, onDelete }) => [
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
      const productId = sale?.productId?._id ?? null;
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

            <DropdownMenuItem onClick={() => onEdit(sale)}>
              Edit
              <Edit className="ml-auto" />
            </DropdownMenuItem>

            <AlertDial
              title="Delete Purchase?"
              onConfirm={() => onDelete(sale._id)}
            >
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
                <Delete className="text-destructive ml-auto" />
              </DropdownMenuItem>
            </AlertDial>

            <DropdownMenuLabel>Links</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link to={`/stock/sales/${sale._id}`}>View sale details</Link>
            </DropdownMenuItem>

            {productId ? (
              <DropdownMenuItem>
                <Link to={`/stock/products/${productId}`}>View Product</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled>No product available</DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(sale._id)}
            >
              Copy sale ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const getProductColumns = ({ onEdit, onDelete }) => [
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
    accessorKey: "category",
    accessorFn: (row) => (row.categoryId ? row.categoryId.name : "N/A"),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Category"
      />
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
    accessorKey: "name",
    accessorFn: (row) => (row.name ? row.name : "N/A"),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Name"
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
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const productId = product?.productId?._id ?? null;

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

            <DropdownMenuItem onClick={() => onEdit(product)}>
              Edit
              <Edit className="ml-auto" />
            </DropdownMenuItem>

            <AlertDial
              title="Delete Purchase?"
              onConfirm={() => onDelete(product._id)}
            >
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
                <Delete className="text-destructive ml-auto" />
              </DropdownMenuItem>
            </AlertDial>

            <DropdownMenuLabel>Links</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link to={`/stock/products/${product._id}`}>View product details</Link>
            </DropdownMenuItem>

            {productId ? (
              <DropdownMenuItem>
                <Link to={`/stock/products/${productId}`}>View Product</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled>No product available</DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product._id)}
            >
              Copy sale ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
