import React, { useState } from "react";
// import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';



// reactstrap components
import {

  Card,
  CardHeader,
  CardBody,
  CardTitle,

  Table,
  Row,
  Col,
  Button,
} from "reactstrap";



import Class from "components/code/Classes";
import Count from "components/code/Count";
import SyntaxError from "components/code/SyntaxError";
import DublicateCode from "components/code/dublicateCode";
import DisGraph from "components/code/disGraph";
import Metrics from "./Metrics";
import { Link } from "react-router-dom";

function Dashboard(props) {



  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);

    
  };
  const [file, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [date, setDate] = useState('');
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState('');


  const handleFileChange = (e) => {
    setFileName(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {

      setFile(file.name);
      setFileExtension(getFileExtension(file.name));
      setFileContent(reader.result);
    };

    reader.onerror = () => {
      console.log('File read error:', reader.error);
    };
  };

  // const saveCode = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   formData.append('codeName', fileName);
  //   formData.append('CodeData', fileContent);
  
  //   try {
  //     const response = await fetch('http://localhost:6000/api/v1/users/addcode', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       alert('File Uploaded Successfully');
  //     } else {
  //       throw new Error('Error Uploading File');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('Error Uploading File');
  //   }
  // };
  

  const codeName = file;
  const CodeData = fileContent;
  
  const saveCode = async (e) => {
    e.preventDefault();
  
    const code = {
      codeName,
      CodeData,
    };
  
    try {
      const response = await axios.post("/users/addcode", code, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        console.log("Success:", response.data);
      } else {
        console.log("Error:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFileExtension = filename => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };



  const current = new Date();
  const dates = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;

  const renderCodeWithLineNumbers = () => {
    const lines = fileContent.split('\n');
    let insideForLoop = false; 
    let insideWhileLoop = false; 
    let insideMultiLineComment = false; 

    const isComment = (line) => {
      return line.trim().startsWith('//');
    };

    return (
      <div>
        <pre>
          {lines.map((line, index) => {
            // Check for multi-line comment 
            if (line.includes('/*')) {
              insideMultiLineComment = true;
            }
            if (line.includes('*/')) {
              insideMultiLineComment = false;
            }

            // Check for single-line comment
            if (isComment(line)) {
              return (
                <div key={index}>
                  <span style={{ marginRight: '10px', color: 'green' }}>
                    {index + 1}
                  </span>
                  <span style={{ color: 'green' }}>{line}</span>
                </div>
              );
            }

            // Check for if and else 
            if (
              (line.includes('if') || line.includes('else')) &&
              !insideMultiLineComment
            ) {
              return (
                <div key={index}>
                  <span style={{ marginRight: '10px', color: 'red' }}>
                    {index + 1}
                  </span>
                  <span style={{ color: 'red' }}>{line}</span>
                </div>
              );
            }

            // Check for for loop 
            if (line.includes('for') && !insideMultiLineComment) {
              insideForLoop = true;
            } else if (line.includes('}') && insideForLoop) {
              insideForLoop = false;
            }

            // Check for while loop
            if (line.includes('while') && !insideMultiLineComment) {
              insideWhileLoop = true;
            } else if (line.includes('}') && insideWhileLoop) {
              insideWhileLoop = false;
            }

            return (
              <div key={index}>
                <span style={{ marginRight: '10px' }}>{index + 1}</span>
                <span
                  style={{
                    color:
                      insideForLoop || insideWhileLoop
                        ? 'blue'
                        : 'inherit',
                  }}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    );
  };

  return (
    <>
      <div className="content">
        
        <Row>
         
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                {/* <h5 className="card-category">Upload Code File</h5> */}
                <CardTitle tag="h4">Upload Code File</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                
            <Row>
              <Col>

                <input type="file" name="file" onChange={handleFileChange} />

                <form onSubmit={saveCode} encType="multipart/form-data">
                  <input type="text" name="codeName" onChange={(e) => setFile(e.target.value)} value={codeName} required style={{ visibility: 'hidden' }}/>
                  <input type="text" name="CodeData" onChange={(e) => setFileContent(e.target.value)} value={CodeData} required style={{ visibility: 'hidden' }} />
                  <Button>submit</Button>
                </form>


                {/* <br></br>
                <input type="file" name="file" onChange={handleFileChange} style={{ marginTop: '-500px' }} />
          
              
                <form onSubmit={submitHandler()}>
                
                <input type="text" name="codeName" value={file} />
                <input type="text" name="CodeData" value={fileContent}  />
                  <Button type="submit"  >
                    Save Code
                  </Button>
                </form> */}
                </Col></Row>

            {/* {fileName && (
              <div>
                <p>File Name: {file}</p>
                <p>Code: This is {fileExtension} Code</p>
              </div>
            )} */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
              <CardTitle tag="h4">Raw Metrics</CardTitle>
               
                
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Count fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                </div>
              </CardBody>
            </Card>
          </Col>
          
          
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              
              <CardBody>
              <DisGraph fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
              
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                    <Class fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Duplicate Code Lines</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  
                  <tbody>
                  <DublicateCode fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Syntax Errors:</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  
                  <tbody>
                  <SyntaxError fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">RAW Code</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  
                  <tbody>
                  
            {renderCodeWithLineNumbers()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Metrics fileExtension1={fileExtension} fileContent1={fileContent} file={fileName}/> */}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
