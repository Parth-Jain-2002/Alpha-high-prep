import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect,useState } from 'react'

function Search() {
  const [data,setData]=useState([]);
  const [year,setYear]=useState([]);
  const [company,setCompany]=useState([]);
  const [quarter,setQuarter]=useState([]);
  const [specificData,setSpecificData]=useState([]);
  const [curYear,setCurYear]=useState();
  const [curCompany,setCurCompany]=useState();
  const [curQuarter,setCurQuarter]=useState();

  function fetchData(){
     fetch(`./data.json`,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
     .then(response=>{
         return response.json();
     })
     .then(data=> {
        data=data['0'];
        console.log(data);
        setData(data);
        let year = []
        for(let yr in data){
            year.push(yr);
        }
        setYear(year);
        setCurYear(year[0]);
        let comData=data[year[0]];
        console.log(comData);
        let com=[];
        for(let company in comData){
            com.push(company);
        }
        setCompany(com);
        setCurCompany(com[0]);
        let quarData=comData[com[0]];
        console.log(quarData);
        let quar=[];
        for(let quarter in quarData){
            quar.push(quarter);
        }
        setQuarter(quar);
        setCurQuarter(quar[0]);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
     });
  }


  useEffect(()=>{
      fetchData();
  },[])

  return (
    <>
    <h1>Search</h1>
    <Autocomplete
      id="combo-box-demo"
      defaultValue={year[0]}
      options={year}
      sx={{ width: 200,display:'inline-block'}}
      onChange={(e)=>{
        setCurYear(e.target.value);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
    }}
      renderInput={(params) => <TextField {...params} label="Year" />}
    />
    <Autocomplete
      id="combo-box-demo"
      options={company}
      defaultValue={company[0]}
      sx={{ width: 200,display:'inline-block'}}
      onChange={(e)=>{
        setCurCompany(e.target.value);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
      }}
      renderInput={(params) => <TextField {...params} label="Company" />}
    />
    <Autocomplete
      id="combo-box-demo"
      options={quarter}
      defaultValue={quarter[0]}
      sx={{ width: 200,display:'inline-block'}}
      onChange={(e)=>{
        setCurQuarter(e.target.value);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
      }}
      renderInput={(params) => <TextField {...params} label="Quarter" />}
    />
    
    <table style={{margin:"50px",'text-align':'left'}}>
        <thead>
          <th>FIELD</th>
          <th>VALUE</th>
        </thead>
        <tbody>
          {Object.entries(specificData).map((row) => {
            return (
              <tr>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default Search