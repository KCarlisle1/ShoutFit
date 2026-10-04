import "./App.css"
import '@fontsource/dynapuff'
import { useEffect, useState } from "react"; //allows for state management and updating - done here for file communication

import MannequinDisplay from "./components/Mannequin.jsx";
import CustomisationDisplay from "./components/Customisation.jsx";
import PostsDisplay from "./components/Posts.jsx";

function App() {

  const [clothingData, setClothingData] = useState([]); //retrieval and change
  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [currentBottomIndex, setCurrentBottomIndex] = useState(0);
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const [currentEyes, setCurrentEyes] = useState(null);
  const [currentMouth, setCurrentMouth] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedColourType, setSelectedColourType] = useState(null);
  const [colours, setColours] = useState({ top: null, bottom: null, shoe: null });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/clothing").then(res => res.json()).then(data => setClothingData(data)).catch(err => console.error(`API Error found of type ${err}`)); //gets api, assignes data to setClothingData and checks for errors
    fetch("/api/posts").then(res => res.json()).then(data => setPosts(data)).catch(err => console.error(`Error loading posts. Type: ${err}`));
  }, []);

  
  const getClothingType = (type) => {
    return clothingData.filter(item => item.type === type) //retrieves 'top', 'bottom', or 'shoe' category
  };

  const arrowClicked = (type, direction) => {
    const clothingItems = getClothingType(type);
    if(!clothingItems.length){
      return;
    };

    if(type === "top"){
      setCurrentTopIndex((prev) => (prev + direction + clothingItems.length) % clothingItems.length);
    }
    else if(type === "bottom"){
      setCurrentBottomIndex((prev) => (prev + direction + clothingItems.length) % clothingItems.length);
    }
    else if(type === "shoe"){
      setCurrentShoeIndex((prev) => (prev + direction + clothingItems.length) % clothingItems.length);
    }

    randomFace();
  };

  const showColourOptions = (type) => {
    setSelectedColourType(type);
    setPopupVisible(true);
  }

  const colourClicked = (colour) => {
    if(!selectedColourType){
      return;
    }
    setColours((prev) => ({ ...prev, [selectedColourType]: colour })); //spread operator to prevent modifying original
  }

  const randomFace = () => {
    const eyesItems = getClothingType("eyes");
    const mouthItems = getClothingType("mouth");

    if(eyesItems.length && mouthItems.length){
      const randomEyesSelection = eyesItems[Math.floor(Math.random() * eyesItems.length)]; //selects random eyes/mouth to display
      const randomMouthSelection = mouthItems[Math.floor(Math.random() * mouthItems.length)];
      setCurrentEyes(randomEyesSelection);
      setCurrentMouth(randomMouthSelection);
    }
  }

  const handlePosting = async (title = "Untitled Outfit") => {
    const postData = {
      title,
      top: {...currentTop, color: colours.top},
      bottom: {...currentBottom, color: colours.bottom},
      shoe: {...currentShoe, color: colours.shoe},
    };

    try{
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //tells backend that content is json
        body: JSON.stringify(postData)
      });

      const saved = await res.json();

      setPosts(prev => [saved, ...prev,]) //local update - turns global in backend
    }
    catch (err) {
      console.error(`Error found of type ${err}`);
    }
  }

  const currentTop = getClothingType("top")[currentTopIndex] || []; //sets the current clothing item by index in api
  const currentBottom = getClothingType("bottom")[currentBottomIndex] || [];
  const currentShoe = getClothingType("shoe")[currentShoeIndex] || [];

  return (
    <div>
      <div id="spiral-background"></div>
      <h1 id="page-title">ShoutFit</h1>
      <MannequinDisplay top={{ ...currentTop, color: colours.top }} bottom={{ ...currentBottom, color: colours.bottom }} shoe={{ ...currentShoe, color: colours.shoe }} eyes={currentEyes} mouth={currentMouth} onArrowClick={arrowClicked}/>
      <CustomisationDisplay top={currentTop} bottom={currentBottom} shoe={currentShoe} onPost={handlePosting} onColourClick={colourClicked} colourOptions={showColourOptions} popupVisible={popupVisible} setPopupVisible={setPopupVisible} selectedColour={colourClicked}/>
      <PostsDisplay posts={posts} setPosts={setPosts}/>
      <footer>
        <p>© 2026 Katie Carlisle</p>
      </footer>
    </div>
  )
}

export default App
