import React, { useEffect,useState } from 'react'

function Search() {
  const [year,setYear]=useState([]);
  const [company,setCompany]=useState([]);
  const [quarter,setQuarter]=useState([]);
  const [specificData,setSpecificData]=useState([]);

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
        let year = []
        for(let yr in data){
            year.push(yr);
        }
        setYear(year);
        let comData=data[year[0]];
        console.log(comData);
        let com=[];
        for(let company in comData){
            com.push(company);
        }
        setCompany(com);
        let quarData=comData[com[0]];
        console.log(quarData);
        let quar=[];
        for(let quarter in quarData){
            quar.push(quarter);
        }
        setQuarter(quar);
        console.log(quarData[quar[0]]);
        setSpecificData(quarData[quar[0]]);
     });
  }


  useEffect(()=>{
      fetchData();
  },[])

  return (
    <>
    <h1>Search</h1>
    <select>
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
    <select>
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
    <select>
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
            console.log(row);
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