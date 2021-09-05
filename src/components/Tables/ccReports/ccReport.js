import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Row,
  Col,
  Table,
  NavItem,
  NavLink,
  Nav,
  Spinner
} from "reactstrap";
import classnames from "classnames";
import Axios from "axios";
import  baseUrl  from "utils/baseUrl";

const CCReport = (props) => {
  const [bulkType, setBulkType] = useState("all");

  var theads = [
    "Sl.No",
    "Item",
    "Quantity recieved(kg)",
    "No. of farmers",
    "Rate of purchase(Rs)",
    "Total Purchase Rate(Rs)",
    "Qty sold(kg)",
    "Rate of sale(Rs)",
    "Total Sales(Rs)",
    "Balance",
  ];
  const [collValues, setCollValues] = useState([]);
  const [salesValues, setSalesValues] = useState([]);
  const [stockValues, setStockValues] = useState([]);

  //fetching data
  useEffect(() => {
    
    Axios.get( `${baseUrl}/cccollection`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })
      .then((jsonRes) => {
        setCollValues(jsonRes.data.items);
      })
      .catch((err) => console.log(err));

    Axios.get(`${baseUrl}/ccsales`, {
      params: { ccid: "11KMKY01", category: `${bulkType}` },
    })
      .then((jsonRes) => {
       
        setSalesValues(jsonRes.data.items);
      })
      .catch((err) => console.log(err));
    
      Axios.get(`${baseUrl}/cstock`, {
        params: { ccid: "11KMKY01", category: `${bulkType}` },
      })
        .then((jsonRes) => {
         
          setStockValues(jsonRes.data.item_stock);
        })
        .catch((err) => console.log(err));
  
  }, [bulkType]);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setBulkType(index);
  };
  return (
    <Row className="mt-3 mt-md-5">
      <Col className="mb-7">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Overall Report</h3>
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
              <NavItem className="col-2 ">
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
          <Table className="align-items-center table-flush mt-5" responsive>
            <thead className="thead-light">
              <tr>
                {theads.map((heading) => {
                  return (
                    <th scope="col" className="col-2">
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {salesValues.length === 0 || collValues.length === 0|| stockValues.length === 0 ? (
                <tbody><Spinner>
                <span className=" sr-only">Loading...</span>
              </Spinner></tbody>
              ) : (
                collValues.map((rowdata, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{`${rowdata.name} (${rowdata.malayalam})`}</td>
                      <td>{rowdata.qty_recieved}</td>
                      <td>{rowdata.farmers}</td>
                      <td>{rowdata.purchase_rate}</td>
                      <td>{rowdata.qty_recieved * rowdata.purchase_rate}</td>
                      <td>{salesValues[index].qty_sold}</td>
                      <td>{salesValues[index].sales_rate}</td>
                      <td>
                        {salesValues[index].qty_sold *
                          salesValues[index].sales_rate}
                      </td>
                      <td>
                        {stockValues[index].stock+(rowdata.qty_recieved - salesValues[index].qty_sold)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  );
};

export default CCReport;
