import React from "react";
import Modal from "react-modal";
import { ViewComponent } from "../Viewcomponent";

export const Popup = ({
  popupTitle,
  handleSubmit,
  handleCancel,
  isOpen,
  CloseIcon,
  currentRow,
  children,
  displaySchema,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={closeModal}
      onRequestClose={handleCancel}
      contentLabel="Example Modal"
      className="customPopup"
      overlayClassName="popupWrap"
      appElement={document.getElementById("root")}
    >
      <div className="popupBodyWrap">
        <div className="page-body m-0 p-0 h-auto">
          <div className="py-3 px-4 drawerHead">
            <h4 className="mb-0">{popupTitle ? popupTitle : "Edit from"}</h4>
            {CloseIcon && (
              <div className="drawerClose" onClick={CloseIcon}>
                <i className="fa fa-close"></i>
              </div>
            )}
          </div>
          <div className="popupChild">{children}</div>
          {currentRow && (
            <div className="viewBoxWrap">
              {displaySchema?.map((attribute) => (
                <React.Fragment key={currentRow[attribute.attrName]}>
                  <div className="viewBox">
                    <ViewComponent attribute={attribute} data={currentRow} />
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
          {(handleCancel || handleSubmit) && (
            <div className="py-3 px-4 drawerFooter">
              {handleCancel && (
                <button
                  className="btn btn-light"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancel
                </button>
              )}
              {handleSubmit && (
                <button
                  className="btn btn-primary ml-2"
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
