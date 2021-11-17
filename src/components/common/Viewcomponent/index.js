import dayjs from "dayjs";
import { isEmpty } from "lodash";
import React from "react";
import {
  DATABASE_TYPES,
  DATEONLY_FORMAT,
  DATE_FORMAT,
  INPUT_TYPES,
} from "../../../constant/common";
import { formatLabel, isImgLink, isPlainArray } from "../../../utils/utils";
import { FalseComponent, TrueComponent, ThumbnailView } from "../../Table/Cell";
import { FileViewer } from "../FileViewer";
import { Popup } from "../Popup";

export const ValueComponent = ({ attribute, value }) => {
  const [View, setView] = React.useState(false);

  if (
    [DATABASE_TYPES?.BOOL].includes(attribute?.type || attribute?.attrType) ||
    typeof value === "boolean"
  ) {
    return value === true ? <TrueComponent /> : <FalseComponent />;
  }

  if ([DATABASE_TYPES?.DATE].includes(attribute?.type || attribute?.attrType)) {
    return value ? dayjs(value).format(DATE_FORMAT) : " - ";
  }

  if (
    [DATABASE_TYPES?.DATEONLY].includes(attribute?.type || attribute?.attrType)
  ) {
    return value ? dayjs(value).format(DATEONLY_FORMAT) : " - ";
  }

  if (
    (attribute?.inputType === INPUT_TYPES.SINGLE_UPLOAD &&
      [DATABASE_TYPES?.STRING].includes(attribute?.type)) ||
    isImgLink(value)
  ) {
    return (
      <div>
        <div onClick={() => setView(!View)}>
          <ThumbnailView url={value} css="SliderIconBox" IconCss="SliderIcon" />
        </div>
        <Popup
          CloseIcon={() => setView(!View)}
          popupTitle={attribute?.attrName}
          handleCancel={() => setView(!View)}
          isOpen={View}
        >
          <FileViewer data={value} />
        </Popup>
      </div>
    );
  }

  if (["string", "number"].includes(typeof value)) {
    return value;
  }

  return !value || isEmpty(value) ? " - "  : JSON.stringify(value);
};

export const ViewComponent = ({ attribute, data }) => {
  const [viewModal, setViewModal] = React.useState(false);

  if (!data || isEmpty(data)) {
    return (
      <div>
        <span>
          <strong>{`${formatLabel(attribute?.label)} : `}</strong>
        </span>
        <span>{" - "}</span>
      </div>
    );
  } else if (
    [DATABASE_TYPES?.JSON, DATABASE_TYPES?.ARRAY].includes(attribute?.type)
  ) {
    let response = data[attribute?.attrName];
    if (!response || !data || isEmpty(data)) {
      return (
        <div>
          <span>
            <strong>{`${formatLabel(attribute?.label)} : `}</strong>
          </span>
          <span>{" - "}</span>
        </div>
      );
    } else if (response?.constructor === Object) {
      return (
        <div>
          <strong>{formatLabel(attribute.label)} :</strong>
          <div className="dataBox flex">
            <div className="card p-2 flex-grow-1">
              <div>
                <div>
                  {Object.keys(response).map((key, i) =>
                    !["id", "_id"].includes(key) ? (
                      <div className="dataList" key={i}>
                        <span className="dataLabel">{formatLabel(key)} : </span>
                        <span className="dataValue">
                          <ValueComponent
                            attribute={attribute}
                            value={response[key]}
                          />
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isPlainArray(response)) {
      return (
        <div>
          <strong>{formatLabel(attribute.label)} :</strong>
          {attribute?.inputType === INPUT_TYPES.MULTI_UPLOAD ? (
            <div>
              <div
                className="thumbnailViewBox"
                onClick={() => {
                  setViewModal(!viewModal);
                }}
              >
                {response?.length
                  ? response?.map((element, index) => (
                      <ThumbnailView
                        key={index}
                        css="SliderIconBox"
                        IconCss="SliderIcon"
                        url={element}
                      />
                    ))
                  : " - "}
              </div>
              <Popup
                isOpen={viewModal}
                handleCancel={(e) => {
                  setViewModal(!viewModal);
                }}
                CloseIcon={() => setViewModal(!viewModal)}
                popupTitle={attribute?.label}
              >
                <FileViewer data={response} />
              </Popup>
            </div>
          ) : (
            <ol>
              {response?.length
                ? response?.map((element, index) => (
                    <li key={index}>
                      <ValueComponent attribute={attribute} value={element} />
                    </li>
                  ))
                : "-"}
            </ol>
          )}
        </div>
      );
    } else if (["string", "number"].includes(typeof response)) {
      return (
        <div>
          <span>
            <strong>{`${formatLabel(attribute?.label)} : `}</strong>
          </span>
          <span>{response || " - "}</span>
        </div>
      );
    } else if (!isPlainArray(response)) {
      return (
        <div>
          <strong>{formatLabel(attribute.label)} :</strong>
          {response?.map((obj, index) => (
            <div className="dataBox flex" key={index}>
              <div className="flex-shrink-0 mr-1 textColor"> {index + 1}. </div>
              <div className="card p-2 flex-grow-1">
                <div>
                  <div>
                    {Object.keys(obj).map((key, i) =>
                      !["id", "_id"].includes(key) ? (
                        <div className="dataList" key={i}>
                          <span className="dataLabel">
                            {formatLabel(key)} :{" "}
                          </span>
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
          ))}
        </div>
      );
    } else {
      return "-";
    }
  }else if (typeof data[attribute?.attrName] === "boolean") {
      return (
        <div>
          <strong>{formatLabel(attribute?.label)} : </strong>
          {data[attribute?.attrName] === true ? <TrueComponent /> : <FalseComponent />}
        </div>
      );
  } else if (attribute?.ref) {
    let response = data[attribute?.attrName];
    if (response?.constructor === Object && data && data[attribute?.attrName]) {
      return (
        <div>
          <strong>{formatLabel(attribute.label)} : </strong>
          {response[attribute?.displayAttribute] || " - "}
        </div>
      );
    } else {
      return (
        <div>
          <strong>{formatLabel(attribute.label)} : </strong>
          {" - "}
        </div>
      );
    }
  } else {
    return (
      <div>
        <span>{`${formatLabel(attribute?.label)} : `}</span>
        <span>
          {data &&
          data[attribute?.attrName] &&
          attribute?.inputType === INPUT_TYPES.SINGLE_UPLOAD ? (
            <div>
              <div
                className="thumbnailViewBox"
                onClick={() => {
                  setViewModal(!viewModal);
                }}
              >
                <ValueComponent
                  attribute={attribute}
                  value={data[attribute?.attrName]}
                />
              </div>
              <Popup
                isOpen={viewModal}
                CloseIcon={() => {
                  setViewModal(!viewModal);
                }}
                handleCancel={() => {
                  setViewModal(!viewModal);
                }}
                popupTitle={attribute?.label}
              >
                <FileViewer data={data[attribute?.attrName]} />
              </Popup>
            </div>
          ) : data && data[attribute?.attrName] ? (
            <ValueComponent
              attribute={attribute}
              value={data[attribute?.attrName]}
            />
          ) : (
            " - "
          )}
        </span>
      </div>
    );
  }
};
