"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Phone, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateEmployee from "./component/CreateEmployee";
import useGetEmployees from "@/views/dashboard/hooks/useGetEmployees";
import { Employee } from "@/types/employee.type";
import DeleteEmployee from "./component/DeleteEmployee";

const EditEmployee = CreateEmployee;

export const columns: ColumnDef<Employee>[] = [
  {
    id: "name",
    header: ({ table }) => <div>Name</div>,
    cell: ({ row }) => {
      return <div>{row.original?.name || ""}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="!px-0">
          Email
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div className="flex items-center space-x-1">
          <Phone size={16} />
          <span>Phone</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("phone") || ""}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => row.toggleSelected(!row.getIsSelected())}
            >
              Edit Employee
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <DeleteEmployee employee={employee} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Dashboard = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const { data: employees } = useGetEmployees();
  const [showEmployeeDetail, setShowEmployeeDetail] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});

  const selectedRow = React.useMemo(() => {
    const row = Object.keys(rowSelection).find(
      (key) => (rowSelection as any)?.[key],
    );
    if (row) {
      setShowEmployeeDetail(true);
    }
    return row;
  }, [rowSelection]);
  const table = useReactTable({
    data: employees?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const initEmployeeValue = React.useMemo(() => {
    const result = selectedRow ? employees?.data?.[+selectedRow] : undefined;
    if (result && result?.phone) {
      result.phone = result.phone.replace("+84", "0");
    }
    return result;
  }, [selectedRow, employees]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-2 py-4">
        <CreateEmployee />

        {showEmployeeDetail && (
          <EditEmployee
            onToggle={setShowEmployeeDetail}
            open={showEmployeeDetail}
            initValue={initEmployeeValue}
          />
        )}
      </div>
      <div className="rounded-md border">
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
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
};

export default Dashboard;
