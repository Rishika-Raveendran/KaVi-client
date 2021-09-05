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

function CCSales(props) {
  //State variables
  //state variable to store values that should be displayed in table
  const [tableValues, setTableValues] = useState([]);
  //to disable/enable table editing
  const [disableVariable, setDisable] = useState(true);
  //to manage local, gpa, organic toggling
  const [bulkType, setBulkType] = useState("all");
  //Making up initial data with all zeroes
  const init_veg_data = props.veg.map((obj) => {
    return {
      name: obj.name,
      malayalam: obj.malayalam,
      qty_sold: 0,
      sales_rate: 0,
      sales_total: 0,
    };
  });

  //variables to store individual type table values which will later be used to update the overall report
  const all_count = useRef(0);
  const stockValues = useRef([]);
  const localValues = useRef([]);
  const organicValues = useRef([]);
  const gpaValues = useRef([]);

  const toggleNavs = (e, category) => {
    e.preventDefault();
    setBulkType(category);
  };

  //handle editimg of table
  const handleEdit = (e) => {
    e.preventDefault();
    setDisable(false);
  };

  //function to save changed data to databse
  const handleSave = (e) => {
    if (e) e.preventDefault();
    Axios.post(`${baseUrl}/ccsales`, {
      ccid: "11KMKY01",
      category: `${bulkType}`,
      data: tableValues,
    });
    if (bulkType === "local") {
      localValues.current = tableValues;
    } else if (bulkType === "gpa") {
      gpaValues.current = tableValues;
    } else if (bulkType === "organic") {
      organicValues.current = tableValues;
    }
    updateReport();
    setDisable(true);
  };

  //function for handling change in table cell
  const handleCellChange = (index, dataType, value) => {
    var itemValue;
    if (value === "") {
      itemValue = 0;
    } else {
      itemValue = parseInt(value);
    }
    
    const newTableData = tableValues.map((item, i) => {
      if (i === index) {
        //Checking if value entered is greater than stock.
        if (
          dataType === "qty_sold" &&
          itemValue > stockValues.current[i].stock
        ) {
          alert(
            `Value entered is greater than stock\nCurrent ${item.name} stock: ${stockValues.current[i].stock}`
          );
          handleSave();
        } else return { ...item, [dataType]: itemValue };
      }
      return item;
    });
    setTableValues(newTableData);
  };

  //updating overall report for collection
  const updateReport = () => {
    const newTableData = init_veg_data.map((item, i) => {
      return {
        name: item.name,
        malayalam: item.malayalam,
        qty_sold:
          localValues.current[i].qty_sold +
          organicValues.current[i].qty_sold +
          gpaValues.current[i].qty_sold,
        sales_rate:
          (localValues.current[i].sales_rate +
            organicValues.current[i].sales_rate +
            gpaValues.current[i].sales_rate) /
          3,
        sales_total:
          localValues.current[i].sales_total +
          organicValues.current[i].sales_total +
          gpaValues.current[i].sales_total,
      };
    });
    Axios.post(`${baseUrl}/ccsales`, {
      ccid: "11KMKY01",
      category: "all",
      data: newTableData,
    });
  };

  var theads = ["Sl.No", "Item", "Quantity sold", "Rate of sales"];

  //fetching values everytime bulk type changes
  useEffect(() => {
    setTableValues([])
    Axios.get(`${baseUrl}/ccsales`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })
      .then((jsonRes) => {
        setTableValues(jsonRes.data.items);
      })
      .catch((err) => console.log(err));
    //Fetching stock value to check the entered value against stock
    Axios.get(`${baseUrl}/cstock`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })
      .then((jsonRes) => {
        stockValues.current = jsonRes.data.item_stock;
      })
      .catch((err) => console.log(err));

    if (all_count.current === 0) {
      //To fetch initial values into local variables and then change local variables only after each edit.
      //Finally the local variable value will be used for updation of database
      Axios.get(`${baseUrl}/ccsales`, {
        params: { ccid: "11KMKY01", category: "local" },
      })
        .then((jsonRes) => {
          localValues.current = jsonRes.data.items;
        })
        .catch((err) => console.log("Local " + err));

      Axios.get(`${baseUrl}/ccsales`, {
        params: { ccid: "11KMKY01", category: "gpa" },
      })
        .then((jsonRes) => {
          gpaValues.current = jsonRes.data.items;
        })
        .catch((err) => console.log("GPA " + err));

      Axios.get(`${baseUrl}/ccsales`, {
        params: { ccid: "11KMKY01", category: "organic" },
      })
        .then((jsonRes) => {
          organicValues.current = jsonRes.data.items;
        })
        .catch((err) => console.log("Organic " + err));

      all_count.current = 1;
    }
  }, [bulkType]);

  return (
    <Row className="mt-3 mt-md-5">
      <Col className="mb-7" xl="10">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">{`Sales (${props.date.getDate()}/${props.date.getMonth()}/${props.date.getFullYear()})`}</h3>
              </div>
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
                            defaultValue={rowdata.qty_sold}
                            id={`qty_sold${rowdata.name}`}
                            type="number"
                            title="Qty sold"
                            onFocus={(e) => e.preventDefault()}
                            onChange={(e) => {
                              handleCellChange(
                                index,
                                "qty_sold",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <div>{rowdata.qty_sold}</div>
                        )}
                      </td>
                      <td>
                        {disableVariable === false ? (
                          <Input
                            className="form-control-alternative"
                            defaultValue={rowdata.sales_rate}
                            id={`sales_rate${rowdata.name}`}
                            type="number"
                            title="Sales_rate"
                            onFocus={(e) => e.preventDefault()}
                            onChange={(e) => {
                              handleCellChange(
                                index,
                                "sales_rate",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <div>{rowdata.sales_rate}</div>
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
      <Col xl="2"></Col>
    </Row>
  );
}

export default CCSales;
