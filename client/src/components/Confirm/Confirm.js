/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/* eslint-disable react/prop-types */
// reactstrap components
import { Button, Modal, ModalBody } from "reactstrap";

const Confirm = ({ show, setShow, task, message }) => {
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={show}
        toggle={() => setShow(!show)}
      >
        <ModalBody className="p-0">
          <div className="text-center">
            <h2 className="text-danger mt-5 ">{message}</h2>
            <Button
              className="my-4"
              color="success"
              onClick={task}
              title="Confirm"
              type="button"
            >
              <i className="mr-2 fa fa-thumbs-up" />
              <span>Confirm</span>
            </Button>
            <Button
              color="secondary"
              onClick={() => setShow(!show)}
              title="Cancel"
              type="button"
            >
              <i className="mr-2 fa fa-trash" />
              <span>Cancel</span>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Confirm;
