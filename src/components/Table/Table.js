import React from "react";
import { useDebouncedCallback } from 'use-debounce';
import {
  useBlockLayout,
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ColumnVisibility from "./ColumnVisibility";
import {
  DefaultColumnFilter,
  GlobalFilter,
  IndeterminateCheckbox,
} from "./TableFilter";
import TablePagination from "./TablePagination";
import { fuzzyTextFilterFn } from "./tableUtils";
import Cell from "./Cell";
import { CURRENT_DATABASE_TYPE, DEFAULT_LENGTH, FIXED_LENGTH_INPUT_TYPES, INPUT_TYPES, MULTIPLIER_INPUT_TYPE, FIXED_LENGTH_TYPES, MULTIPLIER,MIN_LENGTH ,DEFAULT_MULTIPLIER,ACTION_COLUMN_MULTIPLIER, ACTION_COLUMN_DEFAULT} from '../../constant/common';
import { Filter } from "./Filter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Table = ({
  appliedFilters,
  config: { name, customActions },
  initialState = {},
  setAPIFilter = () => { },
  columns,
  data = [],
  applyFilters,
  allowRowSelection,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onMultiDelete,
  onAssignRole,
  allowTotalCount,
  globalSearch,
  paginate,
  pageLimit = 10,
  allowSorting,
  allowColResize,
  allowColVisibility,
  isMocking,
  paginationProps,
  onPageChange,
  onLimitChange,
  onCustomActionClick,
}) => {
  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = React.useMemo(
    () => ({
      // Cell: EditableCell,
      // Let's set up our default Filter UI
      // width: COLUMN_WIDTH,
      Filter: DefaultColumnFilter,
    }),
    []
  );
const [columnState,setColumnState] = React.useState(columns)
    const getWidthOfAction = () => {
    const actions = [...(customActions ?? [])];
    if (onView) {
      actions.push(onView);
    }
    if (onEdit) {
      actions.push(onEdit);
    }
    if (onDelete) {
      actions.push(onDelete);
    }
    return (actions.length * ACTION_COLUMN_MULTIPLIER) > (ACTION_COLUMN_DEFAULT) ? (actions.length * ACTION_COLUMN_MULTIPLIER) : ACTION_COLUMN_DEFAULT ;
  };

  React.useEffect(() => {
    library.add(fas);
  }, []);

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    prepareRow,

    // Pagination
    page,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,

    // Filters
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, globalFilter, filters, sortBy },
  } = useTable(
    {
      columns: columnState,
      data,
      defaultColumn,
      filterTypes,
      manualSortBy: !isMocking,
      manualFilters: !isMocking,
      manualPagination: !isMocking,
      initialState: isMocking
        ? {
          pageIndex: 0,
          pageSize: pageLimit,
        }
        : {
          pageIndex: paginationProps.pageIndex,
          pageSize: paginationProps.pageSize,
          ...initialState,
        },
      pageCount: isMocking
        ? -1
        : Math.ceil(paginationProps.totalCount / paginationProps.pageSize),
    },
    useColumnOrder,
    useResizeColumns,
    useBlockLayout,
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      // Row selection
      if (allowRowSelection) {
        hooks.allColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            // TODO - Need to change name
            width: 80,
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div style={{ width: "50px" }}>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            sequence: 0,
            accessor: "selection",
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div style={{ width: "50px" }}>
                <IndeterminateCheckbox
                  {...row.getToggleRowSelectedProps()}
                  currentRowIndex={row.index}
                />
              </div>
            ),
          },
          ...columns,
        ]);
      }

      // View | Edit | Delete
      if (onView || onEdit || onDelete || onAssignRole || customActions?.length > 0) {
        hooks.allColumns.push((columns) => [
          ...columns,
          {
            Header: "Actions",
            accessor: "actions",
            width: getWidthOfAction(),
            Cell: (row) => (
              <div className="actionIcon">
                {onView && (
                  <button
                    className="btn btn-primary action btn-sm"
                    type="button"
                    onClick={() => {
                      onView(row.row.original);
                    }}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                )}
                {onEdit && (
                  <button
                    className="btn btn-primary action btn-sm"
                    type="button"
                    onClick={() => onEdit(row.row.original)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-light action btn-sm"
                    type="button"
                    onClick={() => onDelete(row.row.original)}
                  >
                    <i className="fa fa-remove"></i>
                  </button>
                )}
                {onAssignRole && (
                  <button
                    className="btn btn-light action btn-sm"
                    type="button"
                    onClick={() => onAssignRole(row.row.original)}
                  >
                    <i className="fa fa-user"></i>
                  </button>
                )}
                {customActions?.length > 0 &&
                  customActions.map((action, index) => (
                    <button
                      className="btn btn-light action"
                      type="button"
                      onClick={() => {
                        onCustomActionClick &&
                          onCustomActionClick(action?.name, row.row.original);
                      }}
                      key={index}
                      data-toggle="tooltip"
                      data-placement="top"
                      data-animation={true}
                      title={`${action?.tooltip}`}
                    >
                      <FontAwesomeIcon size="sm" icon={action?.icon} />
                    </button>
                  ))}
              </div>
            ),
            Footer: "Actions",
          },
        ]);
      }
    }
  );
  React.useLayoutEffect(() => {
    let tempColumnState = [...columnState]
    tempColumnState = tempColumnState?.map(c => {
      return { ...c, width: widthGetter(c) }
    })
    setColumnState(tempColumnState)
  }, [pageIndex])
  const widthFinder = React.useCallback((data) => {
    if (data) {
      let tracker = {
        minLength: Number.MAX_VALUE,
        maxLength: 0,
      };
      const widthData = {};
      data.map((d) => {
        const cellData = d?.original ?? {}
        Object.keys(cellData).map((dataKey) => {
          if (typeof cellData[dataKey] === "string" || typeof cellData[dataKey] === "number") {
            if (typeof cellData[dataKey] === "number") {
              cellData[dataKey] = cellData[dataKey].toString()
            }
            if (!widthData[dataKey]) {
              widthData[dataKey] = { ...tracker };
            }
            if (cellData[dataKey]?.length < widthData[dataKey].minLength) {
              widthData[dataKey].minLength = cellData[dataKey]?.length;
            }

            if (cellData[dataKey]?.length > widthData[dataKey].maxLength) {
              widthData[dataKey].maxLength = cellData[dataKey]?.length;
            }
          }
          else if (Array.isArray(cellData[dataKey])) {
            if (!widthData[dataKey]) {
              widthData[dataKey] = { ...tracker };
            }
            if (cellData[dataKey]?.length < widthData[dataKey].minLength) {
              widthData[dataKey].minLength = cellData[dataKey]?.length;
            }
            if (cellData[dataKey]?.length > widthData[dataKey].maxLength) {
              widthData[dataKey].maxLength = cellData[dataKey]?.length;

            }
          }
        });
      });
      return widthData
    }
    return null
  }, [page]);

  const widthGetter = (apiData) => {
    const widthData = widthFinder(page)
    let length = DEFAULT_LENGTH;
    if (FIXED_LENGTH_INPUT_TYPES[apiData.inputType]) {
      length = FIXED_LENGTH_INPUT_TYPES[apiData.inputType]
    }
    else if (MULTIPLIER_INPUT_TYPE[apiData.inputType]) {
      length =
        widthData[apiData.accessor]?.maxLength * (MULTIPLIER_INPUT_TYPE[apiData.inputType] ?? DEFAULT_MULTIPLIER);
    }
    else if (FIXED_LENGTH_TYPES?.[apiData.attrType]) {
      length = FIXED_LENGTH_TYPES?.[apiData.attrType];
    } else if (widthData[apiData.accessor]?.maxLength) {
      length =
        widthData[apiData.accessor]?.maxLength * (MULTIPLIER?.[apiData.attrType] ?? DEFAULT_MULTIPLIER);
    }
    length = (apiData.displayName?.length * DEFAULT_MULTIPLIER) > length ? (apiData.displayName?.length * DEFAULT_MULTIPLIER) : length
    return length > MIN_LENGTH ? length : MIN_LENGTH
  };

  const debouncedFilter = useDebouncedCallback(setAPIFilter, 1000, []);

  React.useEffect(() => {
    debouncedFilter({
      globalFilter,
      filters,
      sortBy,
    });
  }, [globalFilter, filters, sortBy]);

  const hasActions = onView || onEdit || onDelete || customActions?.length > 0;

  const TableDataCount = () => {
    if (allowTotalCount) {
      if (isMocking) {
        if (selectedFlatRows?.length > 0) {
          return `(${selectedFlatRows?.length}/${data?.length || 0} selected)`;
        } else {
          return `(${data?.length || 0})`;
        }
      } else {
        if (selectedFlatRows?.length > 0) {
          return `(${selectedFlatRows?.length}/${paginationProps?.totalCount || 0
            } selected)`;
        } else {
          return `(${paginationProps?.totalCount || 0})`;
        }
      }
    } else {
      return "";
    }
  };

  return (
    <React.Fragment>
      {/* Header */}
      <div className="page-header">
        <div className="row flex justify-between m-0 tablePageTop">
          <div className="page-header-left">
            <h3>
              {name}
              <TableDataCount />
            </h3>
            <Filter
              appliedFilters={appliedFilters}
              applyFilters={applyFilters}
              columns={columns}
            />
          </div>
          <div className="row flex justify-between m-0">
            {selectedFlatRows.length > 1 && onMultiDelete && (
              <button
                onClick={() => onMultiDelete(selectedFlatRows.map((row) => row.original.id))}
                className="btn btn-danger mr-2"
                type="button"
              >
                Delete
              </button>
            )}
            {onAdd && (
              <button
                onClick={onAdd}
                className="btn btn-primary mr-2"
                type="button"
              >
                Add +
              </button>
            )}
            <ColumnVisibility
              allowToggleColumnVisibilityProp={allowColVisibility}
              allColumns={allColumns}
            />
            {globalSearch && (
              <div className="globalSearch">
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Header */}

      {/* Table */}
      <div className="tableWrapFilter">
        <div {...getTableProps()} className={`table ${hasActions ? 'stickyColumn' : ''} tableBox card`}>
          {/* Table Header */}
          <div className="tableHeadWrap">
            {headerGroups?.length > 0 && (
              <div
                {...headerGroups[0]?.getHeaderGroupProps()}
                className="tableHead"
              >
                {headerGroups[0]?.headers?.map((column) => (
                  <div {...column.getHeaderProps()} className="tableHeadBox">
                    <div className="tableTop">
                      <div className="tableHeadTitle">
                        {allowSorting &&
                          column.isSortable &&
                          !["actions", "selection"].includes(column?.id) ? (
                          <div
                            className="tableSequence"
                            {...column?.getSortByToggleProps()}
                            style={{ cursor: 'default' }}
                          >
                            <span className="sortingTitle">{column.displayName}</span>
                            {/* Add a sort direction indicator */}
                            <div className="sortingBox">
                              {column?.isSorted ? (
                                column?.isSortedDesc ? (
                                  <i className="fa fa-caret-up"></i>
                                ) : (
                                  <i className="fa fa-caret-down"></i>
                                )
                              ) : (
                                <i className="fa fa-sort"></i>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span>{column.displayName}</span>
                        )}
                        {/* Render the columns filter UI */}

                        {/* Use column.getResizerProps to hook up the events correctly */}
                        {allowColResize && (
                          <div
                            {...column?.getResizerProps()}
                            className={`resizer ${column?.isResizing ? "isResizing" : ""
                              }`}
                          />
                        )}
                        {column?.render("Header")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Table Header */}

          {/* Table Body */}
          {page?.length > 0 ? (
            <div {...getTableBodyProps()}>
              {page?.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()}>
                    <div className="tr">
                      {row?.cells?.map((cell) => (
                        <div {...cell.getCellProps()} className="td">
                          <span className="tableDataLabel">
                            <Cell cell={cell} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="noRecords"> No Records Found</div>
          )}
          {/* Table Body */}
        </div>


      </div>
      {/* Table */}

      {/* Footer */}
      {paginate && (
        <TablePagination
          pageCount={pageCount}
          isMocking={isMocking}
          gotoPage={isMocking ? gotoPage : onPageChange}
          updateTablePageIndex={gotoPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={paginationProps.pageSize}
          pageLimitProp={pageLimit}
          setPageSize={isMocking ? setPageSize : onLimitChange}
          dataLength={page.length}
        />
      )}

      {/* Footer */}
    </React.Fragment>
  );
};

export default React.memo(Table);
