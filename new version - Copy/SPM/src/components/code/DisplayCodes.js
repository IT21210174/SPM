import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

function DisplayCodes() {
  const [oitems, setoitems] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const id = useParams().id;

  const [code, setCode] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const DelayedData = ({ code }) => {
  //   return (
  //     <div>
  //       {code.length > 0 ? (
  //         <ul>
  //           {code.map((item) => (
  //             <li key={item._id}>{item.codeName}</li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>No data available.</p>
  //       )}
  //     </div>
  //   );
  // }
  

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

  const deleteCode = async (_id) => {
    const res = await axios.delete(`/users/deletecode/${_id}`);
    if (res.status === 200) {
      alert("Code deleted successfully!");
      window.location.reload();
    } else {
      alert("Error occurred while deleting code!");
    }
  }


  // useEffect(() =>{
  //   axios.get("/users/getallcode").then((res) => {
  //     setCode(res.data);
  //   })

  // },[])
  // console.log(code);
  // console.log(loading)
  // console.log(code);

  return (
    <div  className="content">
      <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Saved Codes</h5>
                {/* {loading ? data.map(code =>{
                  return(
                    <div>
                      <h1>{code.codeName}</h1>
                    </div>
                  )
                }): <p>Loading data...</p>} */}
                {/* {Object.values(code).map((c, index) => (
                  <div key={index}>
                    {Object.values(c).map((item, index) => (
                      <div key={index}>
                        <h1>{item.codeName}</h1>
                      </div>
                    
                    ))}
                  </div>
                ))} */}

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
                              <td><Button onClick={() => deleteCode(item._id)}>Delete File</Button></td>
                              
                            </tr>
                          </div>
                        
                        ))}
                      </div>
                    ))}
                  </tbody>
                </Table>

              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>     
        </Row>
    </div>
  );
}

export default DisplayCodes;
