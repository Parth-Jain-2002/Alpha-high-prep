import React, { useEffect,useState } from 'react'

function Search() {
  const [year,setYear]=useState([]);
  const [company,setCompany]=useState([]);
  const [quarter,setQuarter]=useState([]);

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
     });
  }


  useEffect(()=>{
      fetchData();
  },[])

  return (
    <>
    <h1>Hello</h1>
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
    </>
  )
}

export default Search