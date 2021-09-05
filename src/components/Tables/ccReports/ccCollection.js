// imports
import React, { useState, useEffect, useRef } from "react";
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
  Spinner
} from "reactstrap";
import classnames from "classnames";
import Axios from "axios";
import baseUrl from "utils/baseUrl";

// Component definition
function CCCollection(props) {
  //state variables  
  //to manage local, gpa, organic toggling
  const [bulkType, setBulkType] = useState("all");
  //to disable/enable table editing
  const [disableVariable, setDisable] = useState(true);

  //Making up initial data with all zeroes
  const init_veg_data = props.veg.map((obj) => {
    return {
      name: obj.name,
      malayalam: obj.malayalam,
      qty_recieved: 0,
      purchase_rate: 0,
      purchase_total: 0,
      farmers: 0,
      extra_qty: 0,
    };
  });

  //state variable to store values that should be displayed in table
  const [tableValues, setTableValues] = useState(init_veg_data);

  //variables to store individual type table values which will later be used to update the overall report
  const all_count = useRef(0);
  const localValues = useRef([]);
  const organicValues = useRef([]);
  const gpaValues = useRef([]);

  //Defining the table headings for collection table
  var theads = [
    "Sl.No",
    "Item",
    "Quantity recieved(kg)",
    "No. of farmers",
    "Rate of purchase(Rs)",
    "Extra Qty available(kg)",
  ];

  //function for updating database for the 'all' section
  const updateReport = () => {
    const newTableData = init_veg_data.map((item, i) => {
      return {
        name: item.name,
        malayalam: item.malayalam,
        qty_recieved:
          localValues.current[i].qty_recieved +
          organicValues.current[i].qty_recieved +
          gpaValues.current[i].qty_recieved,
        purchase_rate:
          (localValues.current[i].purchase_rate +
            organicValues.current[i].purchase_rate +
            gpaValues.current[i].purchase_rate) /
          3,
        purchase_total:
          localValues.current[i].purchase_total +
          organicValues.current[i].purchase_total +
          gpaValues.current[i].purchase_total,
        farmers:
          localValues.current[i].farmers +
          organicValues.current[i].farmers +
          gpaValues.current[i].farmers,
        extra_qty:
          localValues.current[i].extra_qty +
          organicValues.current[i].extra_qty +
          gpaValues.current[i].extra_qty,
      };
    });
    Axios.post(`${baseUrl}/cccollection`, {
      ccid: "11KMKY01",
      category: "all",
      data: newTableData,
    });
  };



  //fetching data
  useEffect(() => {
    setTableValues([])
    Axios.get(`${baseUrl}/cccollection`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })
      .then((jsonRes) => {
        setTableValues(jsonRes.data.items);
      })
      .catch((err) => console.log(err));
    //The initial values for localValues,gpaValues, oranicValues are 
    //given by fetching the data only the first time useEffect runs
    //Thereafter, everytime the user edits the local, gpa or organic tables,
    //these variables will be changed and the updation to the database(for the 'all' section) is done using the same. 
    if (all_count.current === 0) {
      Axios.get(`${baseUrl}/cccollection`, {
        params: { ccid: "11KMKY01", category: "local" },
      })
        .then((jsonRes) => {
          localValues.current = jsonRes.data.items;
        })
        .catch((err) => console.log("Local " + err));

      Axios.get(`${baseUrl}/cccollection`, {
        params: { ccid: "11KMKY01", category: "gpa" },
      })
        .then((jsonRes) => {
          gpaValues.current = jsonRes.data.items;
        })
        .catch((err) => console.log("GPA " + err));

      Axios.get(`${baseUrl}/cccollection`, {
        params: { ccid: "11KMKY01", category: "organic" },
      })
        .then((jsonRes) => {
          organicValues.current = jsonRes.data.items;
        })
        .catch((err) => console.log("Organic " + err));

      all_count.current = 1;
    }
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
    Axios.post(`${baseUrl}/cccollection`, {
      ccid: "11KMKY01",
      category: `${bulkType}`,
      data: tableValues,
    }).catch((err) => console.log("Posting collection : " + err));
    //Changing variables to keep them updated for calculation in the updateReport function
    if (bulkType === "local") {
      localValues.current = tableValues;
    } else if (bulkType === "gpa") {
      gpaValues.current = tableValues;
    } else if (bulkType === "organic") {
      organicValues.current = tableValues;
    }
    updateReport();
//Once user hits save, the table reverts back to non-editable state
    setDisable(true);
  };

  //function to handle the changes in input field
  const handleCellChange = (index, dataType, value) => {
    var itemValue;
    if (value === "") {
      itemValue = 0;
    } else {
      itemValue = parseInt(value);
    }
//newData stores the tableValues as such except for the changed fields.
    const newTableData = tableValues.map((item, i) => {
      if (i === index) {
        return { ...item, [dataType]: itemValue };
      }
      return item;
    });
    //The tableValues are set to new alues as the user should see the changes made
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
                <h3 className="mb-0">{`Collection (${props.date.getDate()}/${props.date.getMonth()}/${props.date.getFullYear()})`}</h3>
              </div>
              {/* Button to toggle table editable state */}
              <div className="col text-right">
                {bulkType !== "all" ? (
                  disableVariable ? (
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
                  )
                ) : (
                  <div></div>
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
              <NavItem className="col-2 offset-3">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "local",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "local")}
                >
                  <span className="d-none d-md-block text-center">Local</span>
                  <span className="d-md-none">L</span>
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "gpa",
                  })}
                  href="#pabl"
                  onClick={(e) => toggleNavs(e, "gpa")}
                >
                  <span className="d-none d-md-block text-center">GPA</span>
                  <span className="d-md-none">G</span>
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "organic",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "organic")}
                >
                  <span className="d-none d-md-block text-center">Organic</span>
                  <span className="d-md-none">O</span>
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
            {/* A spinner is shown until the table data loads */}
            {tableValues.length === 0 ? (
              <tbody>
                <Spinner>
                  <span className=" sr-only">Loading...</span>
                </Spinner>
              </tbody>
            ) : (
              <tbody>
                {tableValues.map((rowdata, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{`${rowdata.name} (${rowdata.malayalam})`}</td>
                      <td>
                        {disableVariable === false ? (
                          <Input
                            className="form-control-alternative"
                            defaultValue={rowdata.qty_recieved}
                            id={`qty_recieved${rowdata.name}`}
                            type="number"
                            title="Qty rec"
                            onChange={(e) => {
                              handleCellChange(
                                index,
                                "qty_recieved",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <div>{rowdata.qty_recieved}</div>
                        )}
                      </td>
                      <td>
                        {disableVariable === false ? (
                          <Input
                            className="form-control-alternative"
                            defaultValue={rowdata.farmers}
                            id={`farmers${rowdata.name}`}
                            type="number"
                            title="farmers"
                            onChange={(e) => {
                              handleCellChange(
                                index,
                                "farmers",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <div>{rowdata.farmers}</div>
                        )}
                      </td>
                      <td>
                        {disableVariable === false ? (
                          <Input
                            className="form-control-alternative"
                            defaultValue={rowdata.purchase_rate}
                            id={`rate${rowdata.name}`}
                            type="number"
                            title="Rate"
                            onChange={(e) => {
                              handleCellChange(
                                index,
                                "purchase_rate",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <div>{rowdata.purchase_rate}</div>
                        )}
                      </td>
                      <td>
                        {disableVariable === false ? (
                          <Input
                            className="form-control-alternative"
                            defaultValue={rowdata.extra_qty}
                            id={`extra${rowdata.name}`}
                            type="number"
                            title="Qty Available"
                            onChange={(e) => {
                              handleCellChange(
                                index,
                                "extra_qty",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <div>{rowdata.extra_qty}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        </Card>
      </Col>
    </Row>
  );
}

export default CCCollection;
