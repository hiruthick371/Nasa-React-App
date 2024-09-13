import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";

function App() {
  const[data,setData] = useState(null);
  const[loading,setLoading] = useState(true);
  
  const[showModal,setShowModal] = useState(false);

  function handleToggleModal(){
    setShowModal(!showModal);
  }

  useEffect(()=>{

    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY; // This variable has the key to the Api
      const today = new Date().toISOString().split('T')[0];
      const localKey = `NASA-${today}`

      const cachedData =localStorage.getItem(localKey);
      if(cachedData){
        setData(JSON.parse(cachedData));
        console.log("Fetched from Cache today")
      } 
      else{
         const url ='https://api.nasa.gov/planetary/apod'+`?api_key=${NASA_KEY}`
      // localStorage.clear()
      try{
        const res = await fetch(url,{cache:"no-store"});
        if(!res.ok){
          throw new Error("Failed to fetch APOD API");
        }
        const apiData = await res.json();
        localStorage.setItem(localKey,JSON.stringify(apiData));
        setData(apiData);
        console.log("Fetched from API today");
      }
      catch(err){
        console.log(err.message)
      }
    }
    setLoading("false");
  }
    fetchAPIData(); 

  },[])


  return (
    <>
        {data?(<Main data={data}/>):(
          <div className="loadingState">
            <i className="fa-solid fa-gear"></i>
            </div>
        )}
    {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}

    {data &&(<Footer data ={data}  handleToggleModal={handleToggleModal}/>)}
    
    </>
  );
}

export default App
