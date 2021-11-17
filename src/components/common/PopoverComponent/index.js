import React from "react";
import Popover from "react-popover";
import { formatLabel, isPlainArray } from "../../../utils/utils";
import { FalseComponent, TrueComponent } from "../../Table/Cell";
import { ValueComponent } from "../Viewcomponent";

export const PopoverComponent = ({ cell, buttonComponent }) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const showPopup = React.useCallback(() => {
    setIsPopoverOpen(!isPopoverOpen);
  }, [isPopoverOpen]);

  const { value: viewData, column: attribute } = cell;
  const PopoverBody = ({ viewData }) => {
    return viewData?.constructor === Object ? (
      <div className="flex flex-wrap">
        <div className="dataBox w-full flex">
          {/* <div className="flex-shrink-0 mr-1"> 1.</div> */}
          <div className="card p-2 flex-grow-1">
            <div>
              {Object.keys(viewData).map((key) =>
                !["id", "_id"].includes(key) ? (
                  <div className="dataList">
                    <span className="dataLabel">{formatLabel(key)}: </span>
                    <span className="dataValue">
                      <ValueComponent
                        attribute={attribute}
                        value={viewData[key]}
                      />
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    ) : Array.isArray(viewData) && !isPlainArray(viewData) ? (
      viewData?.map((obj, index) => (
        <div className="flex flex-wrap">
          <div className="dataBox w-full flex">
            <div className="flex-shrink-0 mr-1"> {index + 1}.</div>
            <div className="card p-2 flex-grow-1">
              <div>
                {!isPlainArray(obj) &&
                  Object.keys(obj).map((key) =>
                    !["id", "_id"].includes(key) ? (
                      <div className="dataList">
                        <span className="dataLabel">{formatLabel(key)}: </span>
                        <span className="dataValue">
                          <ValueComponent
                            attribute={attribute}
                            value={obj[key]}
                          />
                        </span>
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <ol>
        {viewData?.map((element, index) => (
          <li key={index}>
            {element === true ? (
              <TrueComponent />
            ) : element === false ? (
              <FalseComponent />
            ) : element ? (
              String(element)
            ) : (
              "-"
            )}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <Popover
      body={[<PopoverBody viewData={viewData} />]}
      isOpen={isPopoverOpen}
      onOuterAction={showPopup}
      refreshIntervalMs={10}
      enterExitTransitionDurationMs={10}
      tipSize={10}
      place="below"
      className="popupCustom"
    >
      <span onMouseOver={showPopup} onMouseOut={showPopup}>
        {buttonComponent}
      </span>
    </Popover>
  );
};
