import React from "react";

// Filtering
// Define a default UI for filtering
export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="tableSearchBox">
      <input
        className="form-control"
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    </div>
  );
}

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, id },
}) {
  const count = preFilteredRows?.length || 0;

  // Show Default filter for only for data columns and not the action
  return (
    !["actions", "selection"].includes(id) && (
      <input
        className="form-control searchBox"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  );
}

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    const { currentRowIndex } = rest;
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate, currentRowIndex]);

    return currentRowIndex >= 0 ? (
      <React.Fragment>
        <div className="checkbox p-0 relative">
          {delete rest.currentRowIndex}
          <input
            ref={resolvedRef}
            {...rest}
            id={currentRowIndex}
            type="checkbox"
          />
          <label className="positionCheckBox" htmlFor={currentRowIndex}></label>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="checkbox p-0 relative">
          <input
            ref={resolvedRef}
            {...rest}
            id="dafault-checkboxall"
            type="checkbox"
          />
          <label
            className="positionCheckBox"
            htmlFor="dafault-checkboxall"
          ></label>
        </div>
      </React.Fragment>
    );
  },
);
