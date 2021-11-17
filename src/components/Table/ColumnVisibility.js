import React from "react";
import { formatLabel } from "../../utils/utils";

function ColumnVisibility({
  allowToggleColumnVisibilityProp,
  allColumns = [],
}) {
  const [isSidebar, setIsSidebar] = React.useState(false);
  const [filterColumnText, setFilterColumnText] = React.useState("");

  return (
    <div className="filterColWrap mr-2">
      {allowToggleColumnVisibilityProp && (
        // <div className="filterCol">
        <>
        <div
          className="filterColsLabel"
          onClick={() => setIsSidebar((old) => !old)}
        >
         <img src={require("../../assets/images/filter.svg")} alt=""/>
          {/* <i className="fa fa-filter"></i> */}
        </div>
        <div className={`filterColsBox ${isSidebar ? "show" : ""}`}>
            <div className="mb-2 tableSearchBox">
              <input
                className="form-control"
                value={filterColumnText}
                onChange={(e) => setFilterColumnText(e.target.value)}
                placeholder="Search"
              />
            </div>
            {allColumns
              .filter((column) =>
                column?.displayName
                  ?.toLowerCase()
                  .includes(filterColumnText.toLowerCase())
              )
              .map(
                (column) =>
                  ![
                    "selection",
                    "expander",
                    "expanderList",
                    "actions",
                  ].includes(column?.id) && (
                    <div className="checkbox p-0" key={column?.id}>
                      <input
                        {...column?.getToggleHiddenProps()}
                        id={column?.id}
                        type="checkbox"
                      />
                      <label className="mb-0 filterLable" htmlFor={column?.id}>
                        {formatLabel(column?.id)}
                      </label>
                    </div>
                  )
              )}
          </div>
        </>
        // </div>
      )}
    </div>
  );
}
export default ColumnVisibility;
