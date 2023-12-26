import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./TimeHistory.css";
import { Timer, TimerType } from "../types/timer";
import { timeToReadable } from "../utils/misc";

const columnHelper = createColumnHelper<Timer>();
const columns = [
  columnHelper.accessor("id", { header: "id" }),
  columnHelper.accessor("type", {
    header: "type",
    cell: ({ renderValue }) => TimerType[renderValue()!],
  }),
  columnHelper.accessor("func", {
    header: "func",
  }),
  columnHelper.accessor("callStack", {
    header: "callStack",
  }),
  columnHelper.accessor("delay", { header: "delay",
  cell: ({ renderValue }) => timeToReadable(renderValue() ?? 0),
}),
  columnHelper.accessor("createdAt", {
    header: "createdAt",
    cell: ({ renderValue }) => renderValue()?.toJSON(),
  }),
  columnHelper.accessor("lastExecuted", {
    header: "lastExecuted",
    cell: ({ renderValue }) => renderValue()?.toJSON(),
  }),
];

export function TimerHistoryTable({
  timerHistory,
}: {
  timerHistory: Timer[];
}) {
  const table = useReactTable({
    columns: columns,
    data: timerHistory,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="datatable-container">
      <table className="datatable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
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
