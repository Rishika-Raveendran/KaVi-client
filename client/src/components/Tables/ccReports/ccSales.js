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
} from "reactstrap";
import classnames from "classnames";
import Axios from "axios";
import baseUrl  from "utils/baseUrl";

function CCSales() {
  const [tableValues, setTableValues] = useState([]);
  const [disableVariable, setDisable] = useState(true);
  const [bulkType, setBulkType] = useState("all");

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
    e.preventDefault();
    Axios.post(`${baseUrl}/ccsales`, {
      ccid: "11KMKY01",
      category: `${bulkType}`,
      data: tableValues,
    });
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
    console.log(`${tableValues[index].name} ${dataType} changed to ${value}`);
    const newTableData = tableValues.map((item, i) => {
      if (i === index) {
        return { ...item, [dataType]: itemValue };
      }
      return item;
    });
    setTableValues(newTableData);
  };

  var theads = ["Sl.No", "Item", "Quantity sold", "Rate of sales"];

  //fetching values everytime bulk type changes
  useEffect(() => {
    Axios.get(`${baseUrl}/ccsales`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })
      .then((jsonRes) => {
        setTableValues(jsonRes.data.items);
      })
      .catch((err) => console.log(err));
    console.log(tableValues);
  }, [bulkType]);

  return (
    <Row className="mt-3 mt-md-5">
      <Col className="mb-7" xl="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Sales</h3>
              </div>
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
                      <td>{`${rowdata.name} (${rowdata.malayalam})`}</td>
                      <td>
                        {disableVariable === false ? (
                          <Input
                            className="form-control-alternative"
                            defaultValue={rowdata.qty_sold}
                            id="qty_sold"
                            type="text"
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
                            id="sales_rate"
                            type="text"
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
      <Col xl="4"></Col>
    </Row>
  );
}

export default CCSales;
