//Component for displaying current stock section in collection centre
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
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import Axios from "axios";
import baseUrl from "utils/baseUrl";

function CCStockCorrection(props) {
  //Background of code:The stock value will be the total stock till the previous day+collection-sales
  
  //state variables
  //for toggling bulktypes
  const [bulkType, setBulkType] = useState("local");
  //toggling edit functionality of table
  const [disableVariable, setDisable] = useState(true);
  //variable for storing value to be displayed in table
  const [tableValues, setTableValues] = useState([]);
  //stores collection values
  const [collValues, setCollValues] = useState([]);
  //stores sales values
  const [salesValues, setSalesValues] = useState([]);
  //stores the corrected values of each vegetable
  const [correctionValues, setCorrectionValues] = useState([]);
  
  //function for toggling bulktypes
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setBulkType(index);
  };
 
//make up initial data
  const init_corr_list = props.veg.map((vegetable) => {
    return {
      name: vegetable.name,
      correction: 0,
      remarks: "",
    };
  });

  //function to make table editable
  const handleEdit = (e) => {
    e.preventDefault();
    setDisable(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setDisable(true);
    updateStockandCorrectionLog();
  };

  //function to handle the changes in a table cell
  const handleCellChange = (i, dataType, itemValue) => {
    var value;
    if (itemValue === "") {
      value = 0;
    } else {
      value = itemValue;
    }
    var newCorrData = [...correctionValues];
    if (dataType === "stock") {
      
      var difference = value - (tableValues[i].stock+collValues[index].qty_recieved-salesValues[index].qty_sold);

      if (difference !== 0) {
        newCorrData[i].correction = difference;
      } else {
        newCorrData[i].correction = 0;
      }
    } else {
      newCorrData[i].remarks = value;
    }
    setCorrectionValues(newCorrData);
  };

  //function to update stock in database and add correction log to database
  const updateStockandCorrectionLog = () => {
    let flag = 0;
    let dataType = "stock";
    //corrData variable stores the correction logs in an array
    let corrData = [];
    const newData = tableValues.map((item, index) => {
      
      let corrVal = correctionValues[index].correction;
      if (corrVal === 0) {
        //if corrected value is 0, it means no correction is made.
      //Hence, the values are copied as is
        return item;
      } else {
        //else the correction data is pushed to the array of correction logs
        //and the vale is changed in the stock array too
        flag = 1;
        corrData.push({ ...correctionValues[index], category: bulkType });//pushing the correction record of current vegetable
        let val = item.stock + corrVal;//Changing stock value
        return { ...item, [dataType]: val };
      }
    });
//Modifying stock in database
    Axios.post(`${baseUrl}/cstock`, {
      ccid: "11KMKY01",
      category: `${bulkType}`,
      data: newData,
    }).catch((err) => console.log(err));

    //Flag is 1=>corrData array is not empty. Only in that case the correction logs will be modified.
    if (flag === 1) {
      Axios.post(`${baseUrl}/clogs`, {
        data: corrData,
        ccid: "11KMKY01",
      }).catch((err) => console.log(err));
    }
  };

  //Headings for the table columns
  var theads = ["Sl.No", "Item", "Quantity stock",  "Remarks","Qty corrected"];

  //Fetching values 
  useEffect(() => {
    setCorrectionValues(init_corr_list);
    setTableValues([]);
    
      Axios.get(`${baseUrl}/cstock`, {
        params: { ccid: "11KMKY01", category: `${bulkType}` },
      })
        .then((jsonRes) => {
          setTableValues(jsonRes.data.item_stock);
        })
        .catch((err) => console.log(err));
 

    Axios.get(`${baseUrl}/cccollection`, {
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
  }, [bulkType]);

  return (
    <Row className="mt-3 mt-md-5">
      <Col className="mb-7">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">{`Stock correction (${props.date.getDate()}/${props.date.getMonth()}/${props.date.getFullYear()})`}</h3>
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
              {/* <NavItem className="col-4">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "all",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "all")}
                >
                  <span className="d-none d-md-block text-center">History</span>
                  <span className="d-md-none">History</span>
                </NavLink>
              </NavItem> */}
              <NavItem className="col-2 offset-6">
                <NavLink
                  className={classnames("py-2 px-3", {
                    active: bulkType === "local",
                  })}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) => toggleNavs(e, "local")}
                  disabled={!disableVariable}
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
                  disabled={!disableVariable}
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
                  disabled={!disableVariable}
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

            {tableValues.length === 0 ||
            collValues.length === 0 ||
            salesValues.length === 0 ? (
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
                      <td>{rowdata.name}</td>

                      <td>
                        <Input
                          className="form-control-alternative"
                          id={`stock${rowdata.name}`}
                          type="number"
                          title="stock"
                          defaultValue={rowdata.stock+collValues[index].qty_recieved-salesValues[index].qty_sold}
                          onChange={(e) => {
                            handleCellChange(index, "stock", e.target.value);
                          }}
                          disabled={disableVariable}
                        />
                      </td>

                      <td>
                        <Input
                          className="form-control-alternative"
                          id={`remarks${rowdata.name}`}
                          type="text"
                          title="Remarks"
                          defaultValue={correctionValues[index].remarks}
                          onChange={(e) => {
                            handleCellChange(index, "remarks", e.target.value);
                          }}
                          disabled={disableVariable}
                        />
                      </td>
                      <td>{correctionValues[index].correction}</td>
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
