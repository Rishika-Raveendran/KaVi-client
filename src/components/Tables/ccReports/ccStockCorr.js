//Component for displaying current stock section in collection centre
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  Row,
  Col,
  Input,
  Table,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import classnames from "classnames";
import Axios from "axios";

function CCStockCorrection() {
  const [bulkType, setBulkType] = useState("all");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setBulkType(index);
  };
  const [disableVariable, setDisable] = useState(true);
  const [tableValues, setTableValues] = useState([]);
  const handleEdit = (e) => {
    e.preventDefault();
    setDisable(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setDisable(true);
  };
  var theads = ["Sl.No", "Item", "Quantity stock", "Qty correction", "Remarks"];
  var trhead = [
    "Green Chilli",
    "Amaranthus(Red)",
    "Bhindi",
    "Brinjal",
    "Cowpea",
    "Tomato",
    "Chilli small",
    "Pumpkin",
    "Cucumber",
    "Salad cucumber",
    "Ash gourd",
  ];
  
  useEffect(() => {
    Axios.get("http://localhost:3001/cstock", {
      params: { ccid: "11KMKY01" ,category:"all"},
    })
      .then((jsonRes) => {
        setTableValues(jsonRes.data.item_stock);
      })
      .catch((err) => console.log(err));
    //console.log(tableValues);
  }, [bulkType]);

  return (
    <Row className="mt-3 mt-md-5">
      <Col className="mb-7">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Collection</h3>
              </div>
              <div className="col text-right">
                {disableVariable ? (
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e) => handleEdit(e)}
                    size="sm"
                  >
                    Correct
                  </Button>
                ) : (
                  <Button
                    color="success"
                    href="#pablo"
                    onClick={(e) => handleSave(e)}
                    size="sm"
                  >
                    Save
                  </Button>
                )}
              </div>
            </Row>
          </CardHeader>
          <div className="col">
            <Nav className="mt-4 row" pills>
              <NavItem className="col-3">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "all",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "all")}
                >
                  <span className="d-none d-md-block text-center">All</span>
                  <span className="d-md-none">All</span>
                </NavLink>
              </NavItem>
              <NavItem className="col-3">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "local",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "local")}
                >
                  <span className="d-none d-md-block text-center">Local</span>
                  <span className="d-md-none">Local</span>
                </NavLink>
              </NavItem>
              <NavItem className="col-3">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "gpa",
                  })}
                  href="#pabl"
                  onClick={(e) => toggleNavs(e, "gpa")}
                >
                  <span className="d-none d-md-block text-center">GPA</span>
                  <span className="d-md-none">GPA</span>
                </NavLink>
              </NavItem>
              <NavItem className="col-3">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "organic",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "organic")}
                >
                  <span className="d-none d-md-block text-center">Organic</span>
                  <span className="d-md-none">Organic</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Table className="align-items-center table-flush mt-3" responsive>
            <thead className="thead-light">
              <tr>
                {theads.map((heading) => {
                  return <th scope="col">{heading}</th>;
                })}
              </tr>
            </thead>

            {tableValues.length === 0 ? (
              <tbody></tbody>
            ) : (
              <tbody>
                {tableValues.map((rowdata, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{rowdata.name}</td>

                      
                     <td>{rowdata.stock}</td>
                      
                      <td>
                        <Input
                          className="form-control-alternative"                          
                          id="correction"
                          type="text"
                          title="Correction"
                          // onChange={(e) => {
                          //   handleCellChange(
                          //     index,
                          //     "qty_recieved",
                          //     e.target.value
                          //   );
                          // }}
                          disabled={disableVariable}
                        />
                      </td>
                      <td>
                        <Input
                          className="form-control-alternative"
                         
                          id="remarks"
                          type="text"
                          title="Remarks"
                          // onChange={(e) => {
                          //   handleRemarks(
                          //     index,
                          //     "qty_recieved",
                          //     e.target.value
                          //   );
                          // }}
                          disabled={disableVariable}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        </Card>
      </Col>
      {/* <Col xl="2"></Col> */}
    </Row>
  );
}

export default CCStockCorrection;
