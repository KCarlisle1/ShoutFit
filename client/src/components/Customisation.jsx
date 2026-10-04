import "./Customisation.css"

const CustomisationDisplay = ({ top, bottom, shoe, onPost, colourOptions, popupVisible, setPopupVisible, selectedColour }) => {
    return(
        <div>
            <form id="customisation-container" onSubmit={(e) => {
                e.preventDefault();
                const title = e.target["outfit-title"].value || "My Outfit";
                onPost(title);
            }}>
                <input type="text" id="outfit-title" placeholder="My Outfit..."></input>
                <div className="clothing-info" id="top-info">
                    <p className="clothing-name" id="top-name">{top.name}</p>
                    <p className="change-colour">change colour:</p>
                    <button className="color-display" id="top-color" type="button" title="change top colour" onClick={() => colourOptions("top")}></button>
                </div>
                <div className="clothing-info" id="bottom-info">
                    <p className="clothing-name" id="bottom-name">{bottom.name}</p>
                    <p className="change-colour">change colour:</p>
                    <button className="color-display" id="bottom-color" type="button" title="change bottom colour"  onClick={() => colourOptions("bottom")}></button>
                </div>
                <div className="clothing-info" id="shoe-info">
                    <p className="clothing-name" id="shoe-name">{shoe.name}</p>
                    <p className="change-colour">change colour:</p>
                    <button className="color-display" id="shoe-color" type="button" title="change shoe colour" onClick={() => colourOptions("shoe")}></button>
                </div>
                <button type="submit" id="post-btn">POST!</button>
            </form>
            <div id="colour-select-container" className={popupVisible ? "visible" : "hidden"}>
                <button id="close-btn" onClick={() => setPopupVisible(false)}>X</button>
                <div className="colour-container">
                    <p className="colour-name" id="red-name">Red</p>
                    <button className="colour-btn" id="red-btn" onClick={() => selectedColour("var(--red)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="orange-name">Orange</p>
                    <button className="colour-btn" id="orange-btn" onClick={() => selectedColour("var(--orange)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="yellow-name">Yellow</p>
                    <button className="colour-btn" id="yellow-btn" onClick={() => selectedColour("var(--yellow)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="light-green-name">Light green</p>
                    <button className="colour-btn" id="light-green-btn" onClick={() => selectedColour("var(--light-green)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="dark-green-name">Dark green</p>
                    <button className="colour-btn" id="dark-green-btn" onClick={() => selectedColour("var(--dark-green)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="light-blue-name">Light blue</p>
                    <button className="colour-btn" id="light-blue-btn" onClick={() => selectedColour("var(--light-blue)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="dark-blue-name">Dark blue</p>
                    <button className="colour-btn" id="dark-blue-btn" onClick={() => selectedColour("var(--dark-blue)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="purple-name">Purple</p>
                    <button className="colour-btn" id="purple-btn" onClick={() => selectedColour("var(--purple)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="pink-name">Pink</p>
                    <button className="colour-btn" id="pink-btn" onClick={() => selectedColour("var(--pink)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="black-name">Black</p>
                    <button className="colour-btn" id="black-btn" onClick={() => selectedColour("var(--black)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="white-name">White</p>
                    <button className="colour-btn" id="white-btn" onClick={() => selectedColour("var(--white)")}></button>
                </div>
                <div className="colour-container">
                    <p className="colour-name" id="brown-name">Brown</p>
                    <button className="colour-btn" id="brown-btn" onClick={() => selectedColour("var(--brown)")}></button>
                </div>
            </div>
        </div>
    );
};

export default CustomisationDisplay;