
import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
function App() {
const [file,setFile] = useState('')
const [getfile,setGetfile]=useState([])
const [update,setUpdate]=useState('')
// const [inputt,setInput]=useState(false)
// const navi =useNavigate();

const changeImage=(e)=>{
  setFile(e.target.files[0])
}

const add=(e)=>{
  e.preventDefault()

  if(file.length===0){
    alert('choose a file')
  }else{
  // console.log(file)
  const formData= new FormData()
  formData.append('file',file)

  axios.post('http://localhost:8080',formData).then(()=>{
    setFile('')
  })
  
}
}
useEffect(()=>{
  axios.get('http://localhost:8080/').then((res)=>{
     setGetfile(res.data)
    //  console.log(res.data);
  })

},[getfile])

const getData=()=>{
  axios.get('http://localhost:8080/').then((res)=>{
    setGetfile(res.data)
    // console.log(res.data);
 })
}

const deletee=(id)=>{
  axios.delete(`http://localhost:8080/${id}`).then((err)=>{
    getData()
    console.log(err)
  })
}

const changeimg=(e)=>{
setUpdate(e.target.files[0])
}
const updatee=(id)=>{
  const formData=new FormData()
  formData.append('file',update)

  axios.put(`http://localhost:8080/${id}`,formData).then((err)=>{
    console.log(err)
  })
}




// console.log(getfile)

const server ='http://localhost:8080/'

  return (
    <div className="App">
     <form onSubmit={add} >
      <input type='file' onChange={changeImage}  />
      <button id='form-btn'>Upload</button>
     </form>
     <div>
      {
      getfile.map((value,index)=><div key={index}>
        <img src={server + value.path} alt='images'></img>
        
        <div id='modify'>
        <input type='file' onChange={changeimg}></input>
        <button onClick={()=>updatee(value._id)}>Update</button>
      
       <button  onClick={()=>deletee(value._id)} id='del-btn'>Delete</button>
        </div>
        
      </div>
      )}
      
     </div>
    </div>
  );
}

export default App;
