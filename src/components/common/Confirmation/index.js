import React from "react";
import Modal from "react-modal";

export const Confirmation = ({
  isOpen,
  handleCancel,
  handleSubmit,
  OkText,
  variant = "btn-danger",
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleCancel}
    contentLabel="Example Modal"
    className="customConfirmPopup"
    overlayClassName="popupWrap"
  >
    <div className="relative">
      <div className="p-4 text-center">
        <h3 className="danger-color">Are you sure?</h3>
        <p className="mb-0">
          With this action, you are about to delete the record. To confirm click
          Delete or Cancel to discard.
        </p>
      </div>
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
              className={`btn ml-2 ${variant}`}
              onClick={handleSubmit}
              type="button"
            >
              {OkText}
            </button>
          )}
        </div>
      )}
    </div>
  </Modal>
);
