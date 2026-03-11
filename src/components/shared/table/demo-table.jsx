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

export default function DemoTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

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

    //?State: Tablo motorunun mevcut durumunu (state) tutar ve yönetir.
    //Normalde useReactTable kendi içinde bazı durumları tutar. Ancak biz dışarıda useState ile bu durumları (sorting, columnFilters vb.) tanımladığımızda, tabloya şunu demiş oluruz: "Kendi kafana göre değil, benim sana verdiğim bu değişkenlere bakarak çalış."
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn('email')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
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

      <div className="flex justify-between items-center">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
