import React, { useEffect, useState } from "react";
import { isBranchStatement, isIterationStatement, isSwitchStatement, isClassDeclaration, countCases } from "components/code/codeAnalysis";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";

import { Lexer } from "chevrotain";
import { allTokens } from "components/code/code_Metrics";
import { parse } from "java-parser";
import axios from 'axios';

function Metrics() {
  const [file, setFile] = useState([]);
  const getSingleCode = async (_id) => {
    try {
      const res = await axios.get(`/users/getsinglecode/${_id}`);
      setFile(res.data);
    } catch (error) {
      console.error('Error fetching single code:', error);
       
    }
  };
  const entries = Object.entries(file);

  let thirdValue = ''; // Initialize a variable to store the third value

  if (entries.length >= 3) {
    [, , [, thirdValue]] = entries; // Destructuring to get the third entry's value
  } else {
    console.log('There are not enough entries in the object.');
  }
  const [input, setInput] = useState('');
  
  const [tokens, setTokens] = useState([]);
  const [tokenizing, setTokenizing] = useState(false);

//  useEffect(() => {

//   setInput(fileContent1);

//  },[fileExtension1, fileContent1, file])

//


  function isMethodDeclaration(code) {
    // Check for the presence of access modifiers and the absence of "class" and "main"
    if ((code.includes("public") || code.includes("private") || code.includes("protected")) &&
        !code.includes("class") && !code.includes("main")) {
        return true;
    }
    return false;
}


  function getClassIdentifier(code){
    let line = code
  }


  function findInheritance(code){
    const liness = code.split("\n");
    const lexer = new Lexer(allTokens);
      
    for(const line of liness){
      const { tokens } = lexer.tokenize(line);
      parse.input = tokens;
    }
  }

  //get all code details
  const [code, setCode] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/users/getallcode");
  
        if (res.status === 200) {
          setCode(res.data); // Assuming res.data is an array
          
        } else {
          alert('Error occurred while retrieving data!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while retrieving data!');
        setCode([]); // Set a default value (an empty array) in case of an error
        
      }
    };
  
    fetchData();
  }, []);

  //get code from file
  

  
  

  // console.log(file);
  
  // if (entries.length >= 3) {
  //   const [, [, secondValue]] = entries; // Destructuring to get the second entry's value
  //   console.log('Value of the second entry:', secondValue);
  // } else {
  //   console.log('There are not enough entries in the object.');
  // }



  // console.log(thirdValue);

 

  


  // Object.entries(file).map(([key, value]) => {
  //   // console.log(key, value);
  //   console.log(key, value)
  // });

  // Object.values(file).map((item, index) => (
    
  // ))

  




  const removeComments = input.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  
  let nestingLevel = 0;
  let currentNestingLevel = 0;
  let classStart = 0;
  let inheritance = 0;
  

  let caseCount = countCases(removeComments);
  // findInheritance(input);

  // console.log(caseCount);

  const lines = removeComments.split("\n");

  console.log(lines);

  var report = [];

  for(const line of lines){
      const startReprt = {
          line: '',
          metric: { 
              typeOfControlStructure: 0,
              nestingLevelStructure: 0,
              inheritanceLevelStructure: 0
          }
      }

      if(line.includes("class")){
          classStart++;
      }
      if(line.includes("}")){
          classStart--;
      }

      const lexer = new Lexer(allTokens);
      const tokenArray = lexer.tokenize(line);
      // console.log(tokenArray.tokens.length);

      startReprt.line = line;

      //Weight Due to Type of Control Structures (Wc)
      if(isBranchStatement(line)){
          startReprt.metric.typeOfControlStructure = 1;
        
      }
      if(isIterationStatement(line)){
          startReprt.metric.typeOfControlStructure = 2;
      }
      if(isSwitchStatement(line)){ 
          startReprt.metric.typeOfControlStructure = 3;
      }

      // Weight Due to Nesting Level of Control Structures (Wn)
      if (!isClassDeclaration(line) && !isMethodDeclaration(line)) {
        if (line.includes("{")) {
            currentNestingLevel++;
        } else if (line.includes("}")) {
            currentNestingLevel--;
            currentNestingLevel = Math.max(currentNestingLevel, 0); // Ensure it's not negative
        }
      }

      // Weight Due to Inheritance Level of Control Structures (Wi)
      // if (isClassDeclaration(line)) {
      //   inheritance = 0;
      // } else if (line.includes("extends")) {
      //   inheritance++;
      // }

      // Weight Due to Size of Control Structures (Wi)
      if(isClassDeclaration(line)){
        startReprt.metric.nestingLevelStructure = 0;
        if(line.includes("{")) {
          inheritance++;
        }
        else if(line.includes("}")){
          inheritance--;
          inheritance = Math.max(inheritance, 0);
        }
      }

  


    startReprt.metric.inheritanceLevelStructure = inheritance;
    startReprt.metric.nestingLevelStructure = currentNestingLevel;

    //WC = wi + wn + wc
    startReprt.metric.WC = startReprt.metric.inheritanceLevelStructure + startReprt.metric.nestingLevelStructure + startReprt.metric.typeOfControlStructure;
    
    //complexity = WC * no of tokens
    if(startReprt.metric.WC == 0){
     
      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }
    if(startReprt.metric.WC >= 1){
      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }
    


    report.push(startReprt);

  }
  

  console.log(report);

  const tokenizeJavaCode = () => {
    setTokenizing(true);
    try {
      const lexer = new Lexer(allTokens);
      const { tokens } = lexer.tokenize(removeComments);
      setTokens(tokens);
    } catch (error) {
      // Handle parsing errors here
      console.error("Parsing error:", error.message);
    } finally {
      setTokenizing(false);
    }
  };

  const clearTokens = () => {
    setTokens([]);
  };


  const renderCodeWithLineNumbers = () => {
    const lines = removeComments.split('\n');
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
          <Col md="8">
          <Table bordered={false} className="table-transparent">
                <thead>
                  </thead>
                  <tbody>
                    {Object.values(code).map((c, index) => (
                      <div key={index}>
                        {Object.values(c).map((item, index) => (
                          <div key={index}>
                            <tr key={item._id}>
                              <td>{item.codeName}</td>
                              <Button onClick={() => getSingleCode(item._id)}>cal wcc</Button>
                              <td></td>
                              
                            </tr>
                          </div>
                        
                        ))}
                      </div>
                    ))}
                  </tbody>
                </Table>
          </Col>
          <Col md="4">
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Metrics</h5>
              </CardHeader>
              <CardBody>
              
                        
                        <Input
                          type="textarea"
                          
                          value={thirdValue}
                          onChange={(e) => setInput(e.target.value)}
                        />
                     
                <CardText>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Line No</th>
                      <th>Tokens</th>
                      <th>Wc</th>
                      <th>Wi</th>
                      <th>Wc</th>
                      <th>Wt</th>
                      <th>Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.line}</td>
                        <td>{item.metric.typeOfControlStructure}</td>
                        <td>{item.metric.nestingLevelStructure}</td>
                        <td>{item.metric.inheritanceLevelStructure}</td>
                        <td>{item.metric.WC}</td>
                        <td>{item.metric.complexity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                  
                </CardText>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Metrics;
