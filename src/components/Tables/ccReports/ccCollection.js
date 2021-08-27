// imports
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
import baseUrl from "utils/baseUrl";

// Component definition
function CCCollection() {
  var base = "http://localhost:3001";
  const [bulkType, setBulkType] = useState("all");
  const [disableVariable, setDisable] = useState(true);
  var theads = [
    "Sl.No",
    "Item",
    "Quantity recieved(kg)",
    "No. of farmers",
    "Rate of purchase(Rs)",
    "Extra Qty available(kg)",
  ];

  const [tableValues, setTableValues] = useState([
   
  ]);

  //fetching data
  useEffect(() => {   
    Axios.get(`${baseUrl}/cccollection`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })      
      .then((jsonRes) => {
        setTableValues(jsonRes.data.items);
      })
      .catch((err) => console.log(err));

    console.log(tableValues);
  }, [bulkType]);

  //function to toggle between bulk types
  const toggleNavs = (e, type) => {
    e.preventDefault();
    setBulkType(type);
  };

  //function to handle editable property of table
  const handleEdit = (e) => {
    e.preventDefault();
    setDisable(false);
  };

  //function to save changes to database
  const handleSave = (e) => {
    e.preventDefault();
    Axios.post(`${ baseUrl }/cccollection`, {
      ccid: "11KMKY01",
      category: `${bulkType}`,
      data: tableValues,
    });
    setDisable(true);
    
  };

  //function to handle thechanges in input field
  const handleCellChange = (index, dataType, value) => {
    var itemValue;
    if (value === "") {
      itemValue = 0;
    } else {
      itemValue = parseInt(value);
    }
    console.log(`${tableValues[index].name} ${dataType} changed to ${value}`);
    const newTableData = tableValues.map((item, i) => {
      if (i === index) {
        return { ...item, [dataType]: itemValue };
      }
      return item;
    });
    setTableValues(newTableData);

  
  };

  return (
    <Row className="mt-3 mt-md-5">
      <Col className="mb-7">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                {/* Category of report */}
                <h3 className="mb-0">Collection</h3>
              </div>
              {/* Button to toggle table editable state */}
              <div className="col text-right">
                {disableVariable ? (
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e) => handleEdit(e)}
                    size="sm"
                  >
                    Edit
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
          {/* Category nav */}
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
          {/* Displaying table */}
          <Table className="align-items-center table-flush mt-3" responsive>
            <thead className="thead-light">
              <tr>
                {theads.map((heading) => {
                  return <th scope="col">{heading}</th>;
                })}
              </tr>
            </thead>
            {tableValues.length === 0 ? (<tbody></tbody>) : (<tbody>
              {tableValues.map((rowdata, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{`${rowdata.name} (${rowdata.malayalam})`}</td>
                    <td>
                     {disableVariable===false?( <Input
                        className="form-control-alternative"
                        defaultValue={rowdata.qty_recieved}
                        id="qty_recieved"
                        type="text"
                        title="Qty rec"
                     
                        onChange={(e) => {
                          handleCellChange(
                            index,
                            "qty_recieved",
                            e.target.value
                          );
                        }}
                      />) : (<div>{rowdata.qty_recieved}</div>)}
                    </td>
                    <td>
                    {disableVariable===false?(<Input
                        className="form-control-alternative"
                        defaultValue={rowdata.farmers}
                        id="farmers"
                        type="text"
                        title="farmers"
                        onChange={(e) => {
                          handleCellChange(index, "farmers", e.target.value);
                        }}
                        
                      />) : (<div>{rowdata.farmers}</div>)}
                    </td>
                    <td>
                    {disableVariable===false?(<Input
                        className="form-control-alternative"
                        defaultValue={rowdata.purchase_rate}
                        id="rate"
                        type="text"
                        title="Rate"
                        onChange={(e) => {
                          handleCellChange(index, "purchase_rate", e.target.value);
                        }}
                        
                      />) : (<div>{rowdata.purchase_rate}</div>)}
                    </td>
                    <td>
                      {disableVariable===false?(<Input
                        className="form-control-alternative"
                        defaultValue={rowdata.extra_qty}
                        id="qty_available"
                        type="text"
                        title="Qty Available"
                        onChange={(e) => {
                          handleCellChange(
                            index,
                            "extra_qty",
                            e.target.value
                          );
                        }}
                        
                      />) : (<div>{rowdata.extra_qty}</div>)}
                    </td>
                  </tr>
                );
              })}
            </tbody>)}
          </Table>
        </Card>
      </Col>
    </Row>
  );
}

export default CCCollection;
