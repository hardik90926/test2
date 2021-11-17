import React from "react";
import useOnClickOutside from "use-onclickoutside";
import { formatLabel } from "./utils";
import { CURRENT_DATABASE_TYPE } from '../constant/common';
import "react-datepicker/dist/react-datepicker.css";

export const COLUMN_WIDTH = Math.round(window.innerWidth * 0.2);
const includesMultiValue = (rows, ids, filterValue) => {
  let allFilters = filterValue.map((val) => val.value);
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return allFilters.includes(rowValue);
    });
  });
};

includesMultiValue.autoRemove = (val) => !val || !val.length;

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const HeaderComponent = ({ column }) => {
  const [dropdown, setDropdown] = React.useState(false);
  const clickRef = React.useRef();
  useOnClickOutside(clickRef, () => setDropdown(false));

  return (
    <React.Fragment>
      <div ref={clickRef} className="tableDropdown show">
      </div>
      <div className="tableTopHead">
        <div
          className="tableSingleFilter"
          onClick={() => {
            setDropdown(true);
          }}
        >
        </div>
      </div>
    </React.Fragment>
  );
};

export const schemaToColumn = (columnProp) => {
  const { attributes } = columnProp;
  //Initiate Array
  let arrayOfColumns = [];

  if (attributes?.length > 0) {
    attributes.forEach((attribute, i) => {
      if (attribute?.ref) {
        let currentColumnObject = {};
        if (attribute?.search !== false) {
          currentColumnObject["Header"] = HeaderComponent;
        }
        currentColumnObject["isSearchable"] = attribute?.search;
        currentColumnObject["databaseType"] = CURRENT_DATABASE_TYPE;
        currentColumnObject["isSortable"] = attribute?.sorting;
        currentColumnObject["accessor"] = `${attribute?.attrName}`;
        currentColumnObject["displayName"] = `${formatLabel(attribute?.label)}`;
        currentColumnObject["inputType"] = attribute.inputType;
        currentColumnObject["valueAttribute"] = attribute.valueAttribute;
        currentColumnObject["displayAttribute"] = attribute.displayAttribute;
        currentColumnObject["modelName"] = attribute?.ref;
        currentColumnObject["width"] = COLUMN_WIDTH;
        currentColumnObject["attrType"] = attribute?.type;
        currentColumnObject["sequence"] =
          attribute?.sequence === "number" ? attribute.sequence + 1 : i + 1;
        arrayOfColumns.push(currentColumnObject);
      } else {
        let currentColumnObject = {};
        if (attribute?.search !== false) {
          currentColumnObject["Header"] = HeaderComponent;
        }
        currentColumnObject["isSearchable"] = attribute?.search;
        currentColumnObject["isSortable"] = attribute?.sorting;
        currentColumnObject["databaseType"] = CURRENT_DATABASE_TYPE;
        currentColumnObject["accessor"] = `${attribute?.attrName}`;
        currentColumnObject["displayName"] = `${formatLabel(attribute?.label)}`;
        currentColumnObject["inputType"] = attribute.inputType;
        currentColumnObject["width"] = COLUMN_WIDTH;
        currentColumnObject["attrType"] = attribute?.type;
        currentColumnObject["sequence"] =
          attribute?.sequence === "number" ? attribute.sequence : i + 1;
        arrayOfColumns.push(currentColumnObject);
      }
    });
  }
  return arrayOfColumns;
};