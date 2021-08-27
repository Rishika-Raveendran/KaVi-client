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
import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Confirm from "components/Confirm/Confirm.js";

const Support = ({ show, setShow }) => {
  const [confirm, setConfirm] = useState(false);

  const send = (e) => {
    e.preventDefault();
    setShow(!show);
    setConfirm(!confirm);
  };

  const sendConfirm = () => {
    setConfirm(!confirm);
    alert("Successfully sent your query, We will contact you soon");
  };

  return (
    <>
      <Confirm show={confirm} setShow={setConfirm} task={sendConfirm} message= "Please click confirm to send the query"/>
      <Modal
        className="modal-dialog-centered"
        isOpen={show}
        toggle={() => setShow(!show)}
      >
        <ModalHeader toggle={() => setShow(!show)}>
          <h3>Contact Support</h3>
        </ModalHeader>
        <ModalBody>
          <Form role="form" onSubmit={send}>
            <FormGroup>
              <Input
                placeholder="Type Your Query Here..."
                rows="10"
                type="textarea"
                style={{ resize: "none" }}
                title="Type Your Query Here"
                required
              />
            </FormGroup>

            <div className="text-center">
              <Button color="success" type="submit" title="Send">
                <i className="mr-2 fa fa-paper-plane" />
                <span>Send</span>
              </Button>
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => setShow(!show)}
                title="Cancel"
              >
                <i className="mr-2 fa fa-trash" />
                <span>Cancel</span>
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Support;
