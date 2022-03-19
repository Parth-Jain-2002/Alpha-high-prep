import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

function Search() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);
  const [compantAndCIK, setCompanyAndCIK] = useState();
  const [company, setCompany] = useState([]);
  const [quarter, setQuarter] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [curYear, setCurYear] = useState();
  const [curCompany, setCurCompany] = useState();
  const [curQuarter, setCurQuarter] = useState();

  function fetchData() {
    const url = 'http://localhost:3000/getAllCompanies';
    // const Data = JSON.stringify(request_object);
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
            setCurYear("2021");
            setQuarter(["Q1", "Q2", "Q3", "Q4"]);
            setCurQuarter("Q1");
            setCompany(com);
            setCurCompany(com[0]);
            setCompanyAndCIK(swapped);
          }
        )
      }
    ).catch((error) => {
      console.log(error)
    })
    // fetch(`./data.json`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
      // .then(response => {
      //   return response.json();
      // })
      // .then(data => {
      //   data = data['0'];
      //   console.log(data);
      //   setData(data);
      //   let year = []
      //   for (let yr in data) {
      //     year.push(yr);
      //   }

      //   let comData = data[year[0]];
      //   console.log(comData);
      //   let quarData = comData[com[0]];
      //   console.log(quarData);
      //   let quar = [];
      //   for (let quarter in quarData) {
      //     quar.push(quarter);
      //   }
        
      //   setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
      // });
  }
  function getDataFromServer(e) {
    e.preventDefault();
    const url = 'http://localhost:3000/getAdditionalCompanyInfo';
    console.log(compantAndCIK)
    let request_object = {
      "year": curYear,
      "cik": compantAndCIK[curCompany],
      "quarter": curQuarter
    }
    console.log(request_object)
    const Data = JSON.stringify(request_object);
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: Data
    };
    fetch(url, requestOptions).then(
      (response) => {
        response.json().then(
          (data) => {
            data = data['data']
            console.log(data);
            let data_arr = []
            for (var e in data) {
              data_arr.push([e,data[e]])
            }
            setSpecificData(data_arr)
            // for (let e in data) {
            //   com.push(data[e])
            // }
            // setYear(["2017", "2018", "2019", "2020", "2021"]);
            // setCurYear("2021");
            // setQuarter(["Q1", "Q2", "Q3", "Q4"]);
            // setCurQuarter("Q1");
            // setCompany(com);
            // setCurCompany(com[0]);
          }
        )
      }
    ).catch((error) => {
      console.log(error)
    })
    // fetch(`./data.json`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
      // .then(response => {
      //   return response.json();
      // })
      // .then(data => {
      //   data = data['0'];
      //   console.log(data);
      //   setData(data);
      //   let year = []
      //   for (let yr in data) {
      //     year.push(yr);
      //   }

      //   let comData = data[year[0]];
      //   console.log(comData);
      //   let quarData = comData[com[0]];
      //   console.log(quarData);
      //   let quar = [];
      //   for (let quarter in quarData) {
      //     quar.push(quarter);
      //   }
        
      //   setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
      // });
  }


  useEffect(() => {
    fetchData();
    console.log(year)
  }, [])

  return (
    <>
      <h1>Search</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={year}
        sx={{ width: 200, display: 'inline-block' }}
        onChange={(e, value) => {
          // console.log()
          setCurYear(e.target.innerText);
          // setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
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
          // setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
        }}
        renderInput={(params) => <TextField {...params} label="Company" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={quarter}
        sx={{ width: 200, display: 'inline-block' }}
        onChange={(e, value) => {
          console.log(value);
          setCurQuarter(e.target.innerText);
          // setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
        }}
        renderInput={(params) => <TextField {...params} label="Quarter" />}
      />
      <button type="submit" onClick={(e)=>{getDataFromServer(e)}}>
        Search
      </button>

      <table style={{ margin: "50px", 'text-align': 'left' }}>
        <thead>
          <th>FIELD</th>
          <th>VALUE</th>
        </thead>
        <tbody>
          {
            specificData.map((row, idx) => {
              console.log(row)
              return (
                <tr key={idx}>
                  <td>
                    {row[0]}
                  </td>
                  <td>
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