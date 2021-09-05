import Layout from "layouts/Layout";
import React from "react";
import { Container, Col, Row, Card, CardBody, CardHeader } from "reactstrap";

function KBDashboard(props) {
  return (
    <Layout pageName="Dashboard" setIsLoggedIn={props.setIsLoggedIn}>
      <Container className="mt--9" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-darker shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col-12">
                    <h5 className="text-uppercase text-light ls-1 mb-1">
                    VIEW REPORTS
                    </h5>
                  </div>
                  <div className="col"></div>
                </Row>
              </CardHeader>
              <CardBody>
                              <div className="container-fluid ">
                              <div className="row">
                    <div className="col-12 col-md-6">
                      <form>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Your block
                          </label>
                          <input
                            class="form-control selectpicker"
                            data-style="btn btn-link"
                            value="Kattur"
                            id="exampleFormControlSelect1"
                            disabled
                          />
                        </div>
                      </form>
                    </div>
                   
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <form>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Your krishibhavan
                          </label>
                          <input
                            class="form-control selectpicker"
                            data-style="btn btn-link"
                            value="Kakkur"
                            id="exampleFormControlSelect1"
                            disabled
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-12 col-md-5 mt-4 mb-3">
                      <button type="submit" class="btn btn-block btn-primary ">
                        <span>View overall report</span>
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <form>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Select EcoShop
                          </label>
                          <select
                            class="form-control selectpicker"
                            data-style="btn btn-link"
                            id="exampleFormControlSelect1"
                          >
                            {/* Dummy data */}
                            <option>EcoShop 1</option>
                            <option>EcoShop 2</option>
                            <option>EcoShop 3</option>
                            <option>EcoShop 4</option>
                            <option>EcoShop 5</option>
                          </select>
                        </div>
                      </form>
                    </div>
                    <div className="col-12 col-md-5 mt-4 mb-4">
                      <button type="submit" class="btn btn-block btn-primary ">
                        View collection center report
                      </button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/*  */}
    </Layout>
  );
}

export default KBDashboard;
