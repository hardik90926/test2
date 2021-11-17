import React from "react";
import { isImgLink, isPlainArray } from "../../utils/utils";
import { PopoverComponent } from "../common/PopoverComponent";
import { Pop } from "../common/Pop";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  DATABASE_TYPES,
  STRING_TYPES,
  CURRENT_DATABASE_TYPE,
  DATE_FORMAT,
  DATEONLY_FORMAT,
  INPUT_TYPES,
  VIEW_MODAL_TYPE,
} from "../../constant/common";
import { FileViewer } from "../common/FileViewer";
import { Popup } from "../common/Popup";

export const IconComponent = ({ css, icon, IconCss }) => (
  <div className={`${css ? css : "multiImage"}`}>
    <span className={`${IconCss ? IconCss : "iconRound"}`}>
      <i className={icon} />
    </span>
  </div>
);

export const ImgComponent = ({ css, icon }) => (
  <div className="multiImage">
    <span className="iconRound">
      <img src={icon} alt={icon} height="18px" width="18px" />
    </span>
  </div>
);

export const ThumbnailView = ({ url, css = "", IconCss = "" }) => {
  const extension = url?.match(/[^.]+$/)[0];
  switch (extension) {
    case "pdf":
      return (
        <IconComponent css={css} IconCss={IconCss} icon="fa fa-file-pdf-o" />
      );

    case "csv":
      return <IconComponent css={css} IconCss={IconCss} icon="fa fa-files-o" />;

    case "xls":
    case "xlsx":
      return <IconComponent css={css} IconCss={IconCss} icon="fa fa-excel-o" />;

    case "jpg":
    case "png":
      return <ImgComponent icon={url} />;

    case "doc":
    case "docx":
      return <IconComponent css={css} IconCss={IconCss} icon="fa fa-word" />;

    case "md":
      return <IconComponent css={css} IconCss={IconCss} icon="fa fa-book" />;

    default:
      return <IconComponent css={css} IconCss={IconCss} icon="fa fa-text" />;
  }
};

export const TrueComponent = () => (
  <label className="activeStatus btn-xs rounded">true</label>
);
export const FalseComponent = () => (
  <label className="dangerStatus btn-xs rounded">false</label>
);

const CellWrapper = ({ cell }) => {
  const [viewModal, setViewModal] = React.useState("none");
  const currentRow = React.useRef(undefined);

  const onViewClick = React.useCallback(
    (type) => {
      currentRow.current = cell?.value;
      setViewModal(type);
    },
    [cell]
  );

  return (
    <>
      {viewModal === VIEW_MODAL_TYPE.DATA && (
        <Pop
          isOpen={viewModal === VIEW_MODAL_TYPE.DATA}
          handleClose={() => {
            setViewModal("none");
          }}
          popupTitle="View Data"
          viewData={currentRow?.current}
        />
      )}
      {viewModal === VIEW_MODAL_TYPE.FILE && (
        <Popup
          isOpen={viewModal === VIEW_MODAL_TYPE.FILE}
          handleCancel={() => {
            setViewModal("none");
          }}
          CloseIcon={() => {
            setViewModal("none");
          }}
          popupTitle={cell?.column.displayName}
        >
          <FileViewer data={currentRow?.current} />
        </Popup>
      )}
      <Cell cell={cell} onViewClick={onViewClick} />
    </>
  );
};

const Cell = ({ cell, onViewClick }) => {
  if (["actions", "selection"].includes(cell?.column?.id)) {
    return cell.render("Cell");
  }

  // For Relations
  if(cell?.column?.modelName){
    if (cell?.value) {
      return (
        <Link
          to={`/${cell?.column?.modelName?.toLowerCase()}/${
            cell?.value?.[cell?.column?.valueAttribute]
          }`}
        >
          <p>{cell?.value[cell?.column?.displayAttribute] || "-"}</p>
        </Link>
      );
    }
    return <p> - </p>;
  }

  // for Array and JSON
  if (
    [
      DATABASE_TYPES?.ARRAY,
      DATABASE_TYPES?.JSON,
      DATABASE_TYPES?.VIRTUAL_RELATION,
    ].includes(cell?.column?.attrType)
  ) {
    // no value received
    if (cell?.value === undefined || cell?.value === null) {
      return <p> - </p>;
    }

    if (Array.isArray(cell.value)) {
      if (!isPlainArray(cell.value)) {
        if (cell.value.length <= 2) {
          return (
            <PopoverComponent
              cell={cell}
              buttonComponent={<span className="btn">View</span>}
            />
          );
        }
        if (cell.value.length > 2) {
          return (
            <span
              className="btn btn-outline-primary btn-xs"
              onClick={() => {
                onViewClick(VIEW_MODAL_TYPE.DATA);
              }}
            >
              View
            </span>
          );
        }
      }
      if (cell.value.length <= 2 || isPlainArray(cell.value)) {
        // Empty Array
        if (cell?.value?.length === 0) {
          return <p> - </p>;
        }

        // MultiUpload Image
        if (
          isPlainArray(cell.value) &&
          [DATABASE_TYPES?.ARRAY].includes(cell?.column?.attrType) &&
          cell?.column?.inputType === INPUT_TYPES.MULTI_UPLOAD
        ) {
          return (
            <div
              className="thumbnailViewBox"
              onClick={() => {
                onViewClick(VIEW_MODAL_TYPE.FILE);
              }}
            >
              {cell?.value?.map((url, i) => (
                <ThumbnailView key={i} url={url} />
              ))}
            </div>
          );
        }

        // Virtual Relationship
        if (cell?.column?.attrType === DATABASE_TYPES?.VIRTUAL_RELATION) {
          return (
            <span
              className="btn btn-outline-primary btn-xs"
              onClick={() => {
                onViewClick(VIEW_MODAL_TYPE.DATA);
              }}
            >
              View
            </span>
          );
        }
      }
      if (cell.value.length > 2) {
        return (
          <span
            className="btn btn-outline-primary btn-xs"
            onClick={() => {
              onViewClick(VIEW_MODAL_TYPE.DATA);
            }}
          >
            View
          </span>
        );
      }
    }

    if (
      cell.value != null &&
      Object.keys(cell.value).length !== 0 &&
      cell.value.constructor === Object
    ) {
      return (
        <PopoverComponent
          cell={cell}
          buttonComponent={<span className="btn">View</span>}
        />
      );
    } else if (cell.value === null || Object.keys(cell?.value).length === 0) {
      // Empty Object
      return <p> - </p>;
    }
    return "-";
  }

  if (typeof cell?.value === "boolean") {
    return cell.value === true ? <TrueComponent /> : <FalseComponent />;
  }

  if ([DATABASE_TYPES?.DATE].includes(cell?.column?.attrType)) {
    return cell?.value ? dayjs(cell?.value).format(DATE_FORMAT) : "-";
  }

  if ([DATABASE_TYPES?.DATEONLY].includes(cell?.column?.attrType)) {
    return cell?.value ? dayjs(cell?.value).format(DATEONLY_FORMAT) : "-";
  }

  // SingleUpload Image
  if (
    isImgLink(cell?.value) ||
    (STRING_TYPES.includes(cell?.column?.attrType) &&
    cell?.column?.inputType === INPUT_TYPES.SINGLE_UPLOAD)
  ) {
    return (
      <span
        className="thumbnailViewBox"
        onClick={() => {
          onViewClick(VIEW_MODAL_TYPE.FILE);
        }}
      >
        <ThumbnailView
          url={cell?.value}
          alt="file"
          height="18px"
          width="18px"
        />
      </span>
    );
  }

  if (!cell?.value && !["actions", "selection"].includes(cell?.column?.id)) {
    return "-";
  }
  return cell.render("Cell");
};

export default CellWrapper;
