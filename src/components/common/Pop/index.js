import React from "react";
import { formatLabel } from "../../../utils/utils";
import { Popup } from "../Popup";
export const Pop = ({ isOpen, handleClose, popupTitle, viewData }) => {
  return (
    <Popup isOpen={isOpen} popupTitle={popupTitle} CloseIcon={handleClose}>
      <div className="p-3 flex flex-wrap">
        {/* <div className="dataBox w-full">
          <div className="card p-2">
            <div>
              <div className="dataList">
                <span className="dataLabel">User name:</span>
                <span className="dataValue">demo</span>
              </div>
              <div className="dataList">
                <span className="dataLabel">Email ID:</span>
                <span className="dataValue">demo@gmail.com</span>
              </div>
              <div className="dataList">
                <span className="dataLabel">Email ID:</span>
                <span className="dataValue">demo@gmail.com</span>
              </div>
              <div className="dataList">
                <span className="dataLabel">Email ID:</span>
                <span className="dataValue">demo@gmail.com</span>
              </div>
            </div>
          </div>
        </div> */}
        {/* full */}
        {viewData?.length > 0 &&
          viewData?.map((obj, index) => (
            <div className="dataBox flex">
              <div className="flex-shrink-0 mr-1 textColor"> {index + 1}.</div>
              <div className="card p-2 flex-grow-1">
                <div>
                  <div>
                    {Object.keys(obj).map((key) =>
                      !["id", "_id"].includes(key) ? (
                        <div className="dataList">
                          <span className="dataLabel">{formatLabel(key)}:</span>
                          <span className="dataValue">{obj[key]}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Popup>
  );
};
