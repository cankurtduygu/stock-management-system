import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronsLeft } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronsRight } from 'lucide-react';

export default function DemoTable({ data, columns,searchableFields = [], searchPlaceholder = 'Search...'  }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState();

  const getByPath = (obj, path) =>
    path
      .split(".")
      .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

  //rhf larda yaptigimiz gibi bir custom hook verildi bize useReactTable dan gelmis oluyor ve ona data ve columns veriyoruz ve o bize tabloyu olusturmak icin gerekli fonksiyonlari veriyor getCoreRowModel gibi getPaginationRowModel gibi getSortedRowModel gibi getFilteredRowModel gibi fonksiyonlar veriyor bize onlari kullanarak tabloyu olusturuyoruz

  //Hayır, tam olarak "prop" değil; bu yazdıkların useReactTable hook'una gönderdiğin bir configuration object (yapılandırma nesnesidir).Bu kodla şunu yapıyorsun: TanStack Table motoruna "Hangi özellikleri kullanmak istediğini" ve "Bu özelliklerin durumunu (state) nasıl yöneteceğini" söylüyorsun.
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //getCoreRowModel: Temel satır yapısı için zorunludur.
    //Row Models (get...RowModel): Bunlar tablonun "beyni"dir.
    getPaginationRowModel: getPaginationRowModel(), //getPaginationRowModel: Sayfalamayı hesaplar.
    //Handlers (on...Change): Kullanıcı bir sütuna tıkladığında veya arama yaptığında React'taki useState fonksiyonlarını tetikleyen köprülerdir.//Burada setSorting fonksiyonunun yanına () koymamanın sebebi şudur: Sen bu fonksiyonu çalıştırmıyorsun, sadece tabloya "lazım olduğunda (örneğin kullanıcı başlığa tıkladığında) bu fonksiyonu sen kullan" diyerek teslim ediyorsun.
    onSortingChange: setSorting, //"Eğer sıralama değişirse, git benim sorting state'imi bu fonksiyonla güncelle
    getSortedRowModel: getSortedRowModel(), //getSortedRowModel: Sıralama mantığını çalıştırır.//Burada parantez () kullanıyorsun çünkü TanStack Table, bu özelliğin içine bir fonksiyonun kendisini değil, o fonksiyonun ürettiği sonucu (algoritmayı) istiyor.
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(), //getFilteredRowModel: Filtreleme mantığını çalıştırır.
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue ?? "")
        .toLowerCase()
        .trim();
      if (!q) return true;

      return searchableFields.some((field) => {
        const value = getByPath(row.original, field);
        // console.log(value);
        return String(value ?? "")
          .toLowerCase()
          .includes(q);
      });
    },

    //?State: Tablo motorunun mevcut durumunu (state) tutar ve yönetir.
    //Normalde useReactTable kendi içinde bazı durumları tutar. Ancak biz dışarıda useState ile bu durumları (sorting, columnFilters vb.) tanımladığımızda, tabloya şunu demiş oluruz: "Kendi kafana göre değil, benim sana verdiğim bu değişkenlere bakarak çalış."
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* //!Bu kod, tablonun görsel iskeletini (UI) oluşturduğumuz yerdir.TanStack Table'dan gelen mantıksal verileri, Shadcn UI bileşenleriyle (Table, TableRow, TableHead) ekrana basıyoruz. */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* //? Bu bölüm, tablonun gövdesini (verilerin olduğu kısım) oluşturur. Burada bir "kontrol" ve iki "döngü" mantığı vardır.  */}

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'} //data-state: Eğer satırın başındaki checkbox ile seçim yapıldıysa, bu satıra "selected" özelliği ekler. Shadcn bu sayede seçili satırı farklı renkte boyar.row.getIsSelected(): Bu fonksiyon sana ya true (doğru) ya da false (yanlış) döndürür.
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      {/* //!Pagination islemleri icin */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>

            {/* //Bu kısım, kullanıcının "Bir sayfada 10 mu yoksa 50 mi satır görmek istiyorsun?" sorusuna yanıt verir. */}
            <Select
            // value: O anki sayfa boyutunu table.getState() üzerinden çeker.
              value={`${table.getState().pagination.pageSize}`}
              // onValueChange: Kullanıcı yeni bir sayı seçtiğinde table.setPageSize ile tabloyu günceller.
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-17.5">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-25 items-center justify-center text-sm font-medium">
          {/* pageIndex + 1: Bilgisayarlar saymaya 0'dan başlar. Kullanıcıya "0. Sayfa" dememek için sonuna +1 ekliyoruz. */}
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {/* getPageCount(): Toplamda kaç sayfa olduğunu hesaplayıp getirir. */}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
            {/* sr-only: Sadece ekran okuyucular içindir, sen görmezsin. */}
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
