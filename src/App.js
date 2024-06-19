import logo from './logo.svg';
import './App.css';
import { TextField, Button } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useState } from 'react';
import axios from "axios"
import fileDownload from 'js-file-download';
function App() {
  const [text, setText] = useState("")
  const [data, setData] = useState(null)

  const handleDownloadAudio = async () => {
    let audio = await axios.post("http://localhost:3000", {text:text}, {
      responseType: 'blob',
    })
    console.log("audio", audio)
    const url = window.URL.createObjectURL(audio.data)
    setData(url)
  }
  
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", marginTop:"10%", alignItems:"center", gap:"10px"}}>
      <AudioFileIcon style={{fontSize:"200px"}}></AudioFileIcon>
      <TextField style={{width:"300px"}} onChange={(event) => setText(event.target.value)}></TextField>
      <audio src={data?data:""} controls autoPlay></audio>
      <Button variant="contained" style={{backgroundColor:"black", width:"300px"}} onClick={handleDownloadAudio}>GENERATE AUDIO</Button>
    </div>
  );
}

export default App;
