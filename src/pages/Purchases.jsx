import { useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectPurchases,
} from '../features/stockSlice';
import { NotFoundCard, ErrorCard } from '../components/shared/InfoCards';
import { PurchaseTableSkeleton } from '../components/shared/Skeletons';
import useStockCall from '../hooks/useStockCall';
import { useEffect } from 'react';
import DataTable from '../components/shared/table/data-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableColumnHeader from '../components/shared/table/data-table-column-header';
import { format } from 'date-fns';
import { Edit, Delete, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Purchases() {
  const { getStockData } = useStockCall();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const purchases = useSelector(selectPurchases);

  console.log(purchases);

  useEffect(() => {
    getStockData('purchases');
  }, []);

  return (
    <section className="space-y-4 pt-3 px-5">
      {error && <ErrorCard error={error} />}

      {isLoading ? (
        <PurchaseTableSkeleton />
      ) : purchases.length === 0 ? (
        <NotFoundCard />
      ) : (
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
            <DataTable
              data={purchases}
              columns={columns}
              searchPlaceholder='Search firm, brand, product and quantity..'
              searchableFields={[
                "firmId.name",
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

//bunlar bizim tablo headerlarımız accessorKey id gibi dusun
export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    // Sorun şu: Sen header (başlık) kısmını değiştirmek isterken, aslında verinin hangi anahtarla eşleşeceğini söyleyen yapıyı bozdun ya da karıştırdın.// Neden Veriler Kayboldu?// TanStack Table'da her sütun iki ana parçadan oluşur:// accessorKey: Veritabanından gelen objenin içindeki ismin birebir aynısı olmalıdır. (Yani DB'de createdAt ise burada da öyle olmalı). // header: Bu sadece "tepede ne yazsın" kısmıdır.
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Created At"
      />
    ),
    // Ey TanStack! Bana o koca props paketini getirme. Ben biliyorum ki o paketin içinde row isminde bir kutu var. Sen paketi daha kapıda aç, içinden sadece row kutusunu bana ver, paketin geri kalanı (column, table, vb.) sende kalsın.
    cell: ({ row }) => (
      <div className="font-medium">
        {format(new Date(row.getValue('createdAt')), 'MMM dd, yyyy')}
      </div>
    ),
  },

  {
    accessorKey: 'firm',
    accessorFn: (row) => (row.firmId ? row.firmId.name : 'N/A'),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Firm"
      />
    ),
  },

  {
    accessorKey: 'brand',
    accessorFn: (row) => (row.brandId ? row.brandId.name : 'N/A'),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Brand"
      />
    ),
  },

  {
    accessorKey: 'product',
    accessorFn: (row) => (row.productId ? row.productId.name : 'N/A'),
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Product"
      />
    ),
  },

  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Quantity"
      />
    ),
  },

  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSorted={column.getIsSorted()}
        title="Amount"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium text-red-600">{formatted}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const purchase = row.original;
      const firmId = purchase?.firmId?._id ?? null;
      console.log(firmId);

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
              <Link to={`/stock/purchases/${purchase._id}`}>
                View purchase details
              </Link>
            </DropdownMenuItem>

            {firmId ? (
              <DropdownMenuItem asChild>
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

export const data = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },

  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
];
