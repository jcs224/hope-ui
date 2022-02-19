import { createContext, splitProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { classNames, createClassSelector } from "@/utils/css";

import { Box } from "../box/box";
import { ElementType, HopeComponentProps } from "../types";
import { tableStyles } from "./table.styles";

export interface TableContextValue {
  /**
   * Set a neutral background color on odd or even row of table.
   */
  striped?: "odd" | "even";

  /**
   * If `true`, row will have less padding.
   */
  dense: boolean;

  /**
   * If `true`, row will have hover color.
   */
  highlightOnHover: boolean;
}

export type TableOptions = Partial<TableContextValue>;

export type TableProps<C extends ElementType = "table"> = HopeComponentProps<C, TableOptions>;

const TableContext = createContext<TableContextValue>();

const hopeTableClass = "hope-table";

export function Table<C extends ElementType = "table">(props: TableProps<C>) {
  const [state] = createStore<TableContextValue>({
    get striped() {
      return props.striped;
    },
    get dense() {
      return props.dense ?? false;
    },
    get highlightOnHover() {
      return props.highlightOnHover ?? false;
    },
  });

  const [local, others] = splitProps(props, ["class", "striped", "dense", "highlightOnHover"]);

  const classes = () => classNames(local.class, hopeTableClass, tableStyles(state));

  return (
    <TableContext.Provider value={state}>
      <Box as="table" role="table" class={classes()} {...others} />
    </TableContext.Provider>
  );
}

Table.toString = () => createClassSelector(hopeTableClass);

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("[Hope UI]: useTableContext must be used within a `<Table/>` component");
  }

  return context;
}
