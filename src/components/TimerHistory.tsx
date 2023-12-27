import {
  Header,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./TimeHistory.css";
import { Timer, TimerType } from "../types/timer";
import { timeToReadable } from "../utils/misc";

const columnHelper = createColumnHelper<Timer>();
const columns = [
  columnHelper.accessor("id", { header: "id", enableSorting: true }),
  columnHelper.accessor("type", {
    header: "type",
    cell: ({ renderValue }) => TimerType[renderValue()!],
    enableSorting: true,
  }),
  columnHelper.accessor("func", {
    header: "func",
    enableSorting: false,

  }),
  columnHelper.accessor("callStack", {
    header: "callStack",
    enableSorting: false,

  }),
  columnHelper.accessor("delay", {
    header: "delay",
    cell: ({ renderValue }) => timeToReadable(renderValue() ?? 0),
    enableSorting: true,
  }),
  columnHelper.accessor("createdAt", {
    header: "createdAt",
    cell: ({ renderValue }) => renderValue()?.toJSON(),
    enableSorting: true,
  }),
  columnHelper.accessor("lastExecuted", {
    header: "lastExecuted",
    cell: ({ renderValue }) => renderValue()?.toJSON(),
    enableSorting: true,
  }),
];

function sortIcon(header: Header<Timer, unknown>) {
  if (!header.column.getCanSort()) return null;
  switch (header.column.getIsSorted()) {
    case false:
      return <FaSort />;
    case "asc":
      return <FaSortUp />;
    case "desc":
      return <FaSortDown />;
  }
}

export function TimerHistoryTable({ timerHistory }: { timerHistory: Timer[] }) {
  const table = useReactTable({
    columns: columns,
    data: timerHistory,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="datatable-container">
      <table className="datatable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {sortIcon(header)}
                </th>
              ))}{" "}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
