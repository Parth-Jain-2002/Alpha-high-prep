import { Autocomplete, TextField } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './search.css'

function Search() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);
  const [compantAndCIK, setCompanyAndCIK] = useState();
  const [company, setCompany] = useState([]);
  const [quarter, setQuarter] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [basicInfo, setBasicInfo] = useState([]);
  const [formsInfo1, setFormsInfo1] = useState([]);
  const [formsInfo2, setFormsInfo2] = useState([]);
  const [curYear, setCurYear] = useState("2021");
  const [curCompany, setCurCompany] = useState();
  const [curQuarter, setCurQuarter] = useState();
  const [display, setDisplay] = useState(true);

  async function fetchData() {
    const url = 'http://localhost:3001/getAllCompanies';
    const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(url, requestOptions).then(
      (response) => {
        response.json().then(
          (data) => {
            data = data['data']
            let com = [];
            let swapped = {}
            for (let e in data) {
              com.push(data[e])
              swapped[data[e]] = e;
            }
            setYear(["2017", "2018", "2019", "2020", "2021"]);
            // console.log(year)
            setCurYear("2021");
            setQuarter(["Q1", "Q2", "Q3", "Q4"]);
            setCurQuarter("Q1");
            setCompany(com);
            setCurCompany(com[0]);
            setCompanyAndCIK(swapped);
            setDisplay("none");
          }
        )
      }
    ).catch((error) => {
      console.log(error)
    })
  }
  function getDataFromServer(e) {
    e.preventDefault();
    let url = 'http://localhost:3001/getAdditionalCompanyInfo';
    // console.log(compantAndCIK)
    let request_object = {
      "year": curYear,
      "cik": compantAndCIK[curCompany],
      "quarter": curQuarter
    }
    // console.log(request_object)
    let Data = JSON.stringify(request_object);
    let requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: Data
    };
    fetch(url, requestOptions).then(
      (response) => {
        response.json().then(
          (data) => {
            data = data['data']
            let data_arr = []
            for (var e in data) {
              data_arr.push([e, data[e]])
            }
            if (data_arr.length == 0) {
              alert("No data found for the given parameters")
            }
            setSpecificData(data_arr)
          }
        )
      }
    ).catch((error) => {
      console.log(error)
    })
    url = 'http://localhost:3001/getBasicCompanyInfo';
    // console.log(compantAndCIK)
    request_object = {
      "company": curCompany,
    }
    // console.log(request_object)
    Data = JSON.stringify(request_object);
    requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: Data
    };
    fetch(url, requestOptions).then(
      (response) => {
        response.json().then(
          (data) => {
            data = data['data']
            // console.log(data);
            let data_arr = []
            for (var e in data) {
              data_arr.push([e, data[e]])
            }
            setBasicInfo(data_arr)
          }
        )
      }
    ).catch((error) => {
      console.log(error)
    })
    url = 'http://localhost:3001/getCompanyForms';
    // console.log(compantAndCIK)
    request_object = {
      "company": curCompany,
      "year": curYear
    }
    // console.log(request_object)
    Data = JSON.stringify(request_object);
    requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: Data
    };
    fetch(url, requestOptions).then(
      (response) => {
        response.json().then(
          (data) => {
            data = data['data']
            // console.log(data);
            let data_arr = []
            for (var e in data["8K"]) {
              data_arr.push([data["8K"][e][0], data["8K"][e][1], data["8K"][e][2]])
            }
            setFormsInfo1(data_arr)
            data_arr = []
            for (var e in data["10KQ"]) {
              data_arr.push([data["10KQ"][e][0], data["10KQ"][e][1], data["10KQ"][e][2]])
            }
            setFormsInfo2(data_arr)
          }
        )
      }
    ).catch((error) => {
      console.log(error)
    })
  }


  useEffect(() => {
    fetchData();
    // console.log(year)
  }, [])

  return (
    <>
      <Box style={{ display: display }}>
        <CircularProgress />
      </Box>
      <h1>Search</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        defaultValue={curYear}
        options={year}
        sx={{ width: 200, display: 'inline-block' }}
        onChange={(e, value) => {
          setCurYear(e.target.innerText);
        }}
        renderInput={(params) => <TextField {...params} label="Year" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={company}
        sx={{ width: 200, display: 'inline-block' }}
        onChange={(e, value) => {
          setCurCompany(e.target.innerText);
        }}
        renderInput={(params) => <TextField {...params} label="Company" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={quarter}
        sx={{ width: 200, display: 'inline-block' }}
        onChange={(e, value) => {
          setCurQuarter(e.target.innerText);
        }}
        renderInput={(params) => <TextField {...params} label="Quarter" />}
      />
      <button type="submit" onClick={(e) => { getDataFromServer(e) }}>
        Search
      </button>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>COMPANY INFO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            {
              basicInfo.map((row, idx) => {
                return (
                  <Row key={idx}>
                    <Col style={{ 'text-align': 'left' }}>{row[0]}</Col>
                    <Col style={{ 'text-align': 'left' }}>{row[1]}</Col>
                  </Row>
                )
              })
            }
          </Container>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>8K forms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Row>
              <Col heading style={{ 'text-align': 'left' }}><h4>Type</h4></Col>
              <Col heading style={{ 'text-align': 'left' }}><h4>Filing Date</h4></Col>
              <Col heading style={{ 'text-align': 'left' }}><h4>URL</h4></Col>
            </Row>
            {
              formsInfo1.map((row, idx) => {
                return (
                  <Row key={idx}>
                    <Col style={{ 'text-align': 'left' }}>{row[0]}</Col>
                    <Col style={{ 'text-align': 'left' }}>{row[1]}</Col>
                    <Col style={{ 'text-align': 'left' }}><a href={row[2]}>{row[2]}</a></Col>
                  </Row>
                )
              })
            }
          </Container>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>10KQ forms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Row>
              <Col heading style={{ 'text-align': 'left' }}><h4>Type</h4></Col>
              <Col heading style={{ 'text-align': 'left' }}><h4>Filing Date</h4></Col>
              <Col heading style={{ 'text-align': 'left' }}><h4>URL</h4></Col>
            </Row>
            {
              formsInfo2.map((row, idx) => {
                return (
                  <Row key={idx}>
                    <Col style={{ 'text-align': 'left' }}>{row[0]}</Col>
                    <Col style={{ 'text-align': 'left' }}>{row[1]}</Col>
                    <Col style={{ 'text-align': 'left' }}><a href={row[2]}>{row[2]}</a></Col>
                  </Row>
                )
              })
            }
          </Container>
        </AccordionDetails>
      </Accordion>

      <table className='content-table' style={{ margin: "50px", 'text-align': 'left' }}>
        <thead>
          <th>FIELD</th>
          <th>VALUE</th>
        </thead>
        <tbody>
          {
            specificData.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td width="40%">
                    {row[0]}
                  </td>
                  <td width="20%">
                    {row[1]}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Search