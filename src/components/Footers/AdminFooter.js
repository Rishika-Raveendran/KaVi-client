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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import "styles/footer.css";

const Footer = () => {
  return (
    
      <footer className="footer" >
        <Container fluid >
        <Row className="align-items-center justify-content-between" >
          <Col sm="4" md="6" xl="6">
            <div className="font-weight-bold  ml-1 text-centre  text-muted">
              Karshika&nbsp;Vipani
            </div>
            <div className="font-weight-bold ml-1 text-centre  text-muted">
              Website&nbsp;by&nbsp;VIBGreenYOR
            </div>
          </Col>

          <Col sm="8" md="6" xl="6" className="coltwo">
            <span className="d-sm-none d-md-block">VIBGreenYOR Agrotech Pvt. Ltd.<br/>Kozhikode, Kerala</span>            
            <div>
              <a href="#">www.vibgreenyor.com</a>
            </div>
          </Col>
        </Row>
        </Container>
      </footer>
   
  );
};

export default Footer;
