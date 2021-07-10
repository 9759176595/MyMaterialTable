import React,{useState, useEffect} from 'react'
import './App.css';
import MaterialTable from 'material-table'


 function App() {
   const url= "https://jsonplaceholder.typicode.com/users"
     const[data, setData]=useState();

     useEffect(()=>{
      getEmployee()
  },[])
  const getEmployee=()=>{
    fetch(url)
      .then(resp=>resp.json())
      .then(resp=>{
        setData(resp)})
  }

     const columns=[
         {title: "Id",field: 'id'},
         {title: "Name",field: "name",validate:rowData=>rowData.name===undefined || rowData.name===""?"Required":true},
         {title: "Username",field: "username"},
         {title: "Email",field: "email"},
         {title: "Phone",field: "phone"},
         {title: "Website",field: "website"}
     ]
    
     
    return(
    <div className="App">
        <h1 align="center">Nemesis Consultants LLP 💟  </h1>
        {/* <h4 align="center"></h4> */}
       <MaterialTable 
       title="Nemesis Employee Data"
       data={data}
       columns={columns}
       options={{
        actionColumnIndex: -1, addRowPosition:"first",
           search: false,
           paging:false,
          //  filtering: true,
           exportButton: true,
       }}

       editable={{
          onRowAdd: (newRow)=>new Promise((resolve, reject)=>{
            const updateRows=[...data,newRow]
            setTimeout(()=>{
              setData(updateRows)
              resolve()
            },1000)
          }),
          onRowDelete: selectedRow=> new Promise((resolve, reject)=>{
            const index=selectedRow.tableData.id;
            const updateRows=[...data]
            updateRows.splice(index,1)
            setTimeout(()=>{
              setData(updateRows)
              resolve()
            },1000)
          }),
          onRowUpdate: (updatedRow,oldRow)=>new Promise((resolve, reject)=>{
           const index=oldRow.tableData.id;
           const updatedRows=[...data]
           updatedRows[index]=updatedRow
            setTimeout(()=>{
              setData(updatedRows)
              resolve()
            },1000)
          })
       }}
     
       />
    </div>
    )
}

export default App;