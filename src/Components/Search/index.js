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
    <select
    onChange={(e)=>{
        setCurYear(e.target.value);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
    }}>
    {
        year.map((x,id)=>{
            return(
                <option value={x} key={id}>
                    {x}
                </option>
            )
        })
    }
    </select>
    <select
    onChange={(e)=>{
        setCurCompany(e.target.value);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
    }}>
    {
        company.map((x,id)=>{
            return(
                <option value={x} key={id}>
                    {x}
                </option>
            )
        })
    }
    </select>
    <select
    onChange={(e)=>{
        setCurQuarter(e.target.value);
        setSpecificData(data[parseInt(curYear)][parseInt(curCompany)][String(curQuarter)]);
    }}>
    {
        quarter.map((x,id)=>{
            return(
                <option value={x} key={id}>
                    {x}
                </option>
            )
        })
    }
    </select>
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