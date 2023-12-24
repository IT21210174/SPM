import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

function pythoncode() {

  return (
    <div  className="content">
      

      <Row>
         
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Raw Metrics</h5>
                
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
          
          
        </Row>
    </div>
  );
}

export default pythoncode;
