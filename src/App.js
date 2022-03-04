import { FcSearch } from 'react-icons/fc';
import './App.css';
import {useState, useEffect} from "react";
import Fade from 'react-reveal/Fade';

function App() {
  const [empNameInp, setEmpNameInp] = useState('')
  const [defList, setDefList] = useState([])
  const [fadeWord, setFadeWord] = useState(false)

  useEffect(()=>{
    if(empNameInp==='') {
      setDefList([])
      setFadeWord(false)
    }
  },[empNameInp])
  
  const searchWord = (e) => {
    
    
    if(e.key==="Enter") {
      e.preventDefault();
      setFadeWord(false)
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+empNameInp)
      .then(res=> res.json())
      .then(data=> {
        setDefList(data)
        setFadeWord(true)
      })
     
    }

  }
  return (
    <div className="App">

      <div >

      <div style={{display:'flex', justifyContent:'center', marginBottom:'10px'}}>
                       <span style={{ position:'relative'}}>
                         <FcSearch style={{ position:'absolute',top:'0' }} size='25'/></span>
                     <span>
                     <input style={{ width:"300px",paddingLeft:'30px', 
                     transition:'all 1s', color:'black' }} 
                     placeholder="Type your word here..."
                      onKeyPress={searchWord}
                     value={empNameInp} onChange={(e)=>setEmpNameInp(e.target.value)} />
                     </span>
                     
                   
                     
                     </div>

        <div className="dictBody">
         
        <Fade right opposite when={fadeWord}>
          <div>
          { defList.length>0? defList.map((m,i)=> {
            return (
              <div key={i+1}>
                <h3>{i+1}.</h3>
                <span>Part Of Speech: {m.meanings[0].partOfSpeech}</span>
                <h5>Definitions</h5>
                <div>
                <ul>
                {m.meanings[0].definitions.map(n=> <li>{n.definition}</li> )}
                </ul>
                </div>
                
              </div>
            )
          }): "No results found"}
          </div>
          </Fade>
          
        </div>

      </div>

    
    </div>
  );
}

export default App;
