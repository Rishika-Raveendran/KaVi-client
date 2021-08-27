import React, { useState} from "react";
import Layout from "layouts/Layout";
import classnames from "classnames";
import { BrowserRouter, Route } from "react-router-dom";
import CCCollection from "components/Tables/ccReports/ccCollection";
import CCReport from "components/Tables/ccReports/ccReport";
import CCStockCorrection from "components/Tables/ccReports/ccStockCorr";
import CCSales from "components/Tables/ccReports/ccSales";

// reactstrap components
import { 
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

function CCDashboard(props) {
  const [activeNav, setActiveNav] = useState(1);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  return (
    <div>
      <Layout pageName="Dashboard" setIsLoggedIn={props.setIsLoggedIn}>
        <>
          {/* Page content */}
          <Container className="mt--9" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col-12">
                        <h5 className="text-uppercase text-light ls-1 mb-1">
                          UPDATE
                        </h5>
                      </div>
                      <div className="col">
                        <Nav className="mt-4 row" pills>
                          <NavItem className="col-3">
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 1,
                              })}
                              data-toggle="tab"
                              href="#pablo"
                              onClick={(e) => toggleNavs(e, 1)}
                            >
                              <span className="d-none d-md-block text-center">
                                Reports
                              </span>
                              <span className="d-md-none">Report</span>
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-3">
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 2,
                              })}
                              data-toggle="tab"
                              href="#pablo"
                              onClick={(e) => toggleNavs(e, 2)}
                            >
                              <span className="d-none d-md-block text-center">
                                Sales
                              </span>
                              <span className="d-md-none">Sales</span>
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-3">
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 3,
                              })}
                              href="#pabl"
                              onClick={(e) => toggleNavs(e, 3)}
                            >
                              <span className="d-none d-md-block text-center">
                                Collection
                              </span>
                              <span className="d-md-none">Coll.</span>
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-3">
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 4,
                              })}
                              data-toggle="tab"
                              href="#pablo"
                              onClick={(e) => toggleNavs(e, 4)}
                            >
                              <span className="d-none d-md-block text-center">
                                Stock correction
                              </span>
                              <span className="d-md-none">Stock corr.</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody></CardBody>
                </Card>
              </Col>
            </Row>

            {activeNav === 1 ? (
              <BrowserRouter>
                <Route exact path="/" component={CCReport} />
              </BrowserRouter>
            ) : activeNav === 2 ? (
              <BrowserRouter>
                <Route exact path="/" component={CCSales} />
              </BrowserRouter>
            ) : activeNav === 3 ? (
              <BrowserRouter>
                <Route exact path="/" component={CCCollection} />
              </BrowserRouter>
            ) : (
              <BrowserRouter>
                <Route exact path="/" component={CCStockCorrection} />
              </BrowserRouter>
            )}
          </Container>
        </>
      </Layout>
    </div>
  );
}

export default CCDashboard;
