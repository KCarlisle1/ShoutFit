import "./Mannequin.css"

const MannequinDisplay = ({ top, bottom, shoe, eyes, mouth, onArrowClick }) => { //props
    return(
        <div id="mannequin-container">
            <img id="eyes-img" src={eyes?.outline} alt={eyes?.name} />
            <img id="mouth-img" src={mouth?.outline} alt={mouth?.name} />
            {/*TOP*/}
            <svg
            className="top" id="top-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 3100" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(-5.4, -2.3)">
                <path className="top-shape" d={top.dValue} fill={top.color || "var(--base-cream)"}/> {/*accesses desired dValue from api*/}
                </g>
            </svg>
            <img className="top" id="top-outline" src={top.outline} />
            {/*BOTTOM*/}
            <svg
            className="bottom" id="bottom-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 3100" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(-5.4, -2.3)">
                <path className="bottom-shape" d={bottom.dValue} fill={bottom.color || "var(--base-cream)"}/>
                </g>
            </svg>
            <img className="bottom" id="bottom-outline" src={bottom.outline} />
            {/*SHOE*/}
            <svg
            className="shoe" id="shoe-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 3100" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(-5.4, -2.3)">
                <path className="shoe-shape" id="left-shoe" d={shoe.dValueLeft} fill={shoe.color || "var(--base-cream)"}/>
                </g>
                <g transform="translate(-5.4, -2.3)">
                <path className="shoe-shape" id="right-shoe" d={shoe.dValueRight} fill={shoe.color || "var(--base-cream)"}/>
                </g>
            </svg>
            <img className="shoe" id="shoe-outline" src={shoe.outline} />

            <div id="left-arrows-container">
                <button className="left-arrow top-arrow" id="left-top-arrow" title="change top" onClick={() => onArrowClick("top", -1)}></button> {/*changes by type and in the correct direction*/}
                <button className="left-arrow bottom-arrow" id="left-bottom-arrow" title="change bottom" onClick={() => onArrowClick("bottom", -1)}></button>
                <button className="left-arrow shoe-arrow" id="left-shoe-arrow" title="change shoe" onClick={() => onArrowClick("shoe", -1)}></button>
            </div>
            <div id="right-arrows-container">
                <button className="right-arrow top-arrow" id="right-top-arrow" title="change top" onClick={() => onArrowClick("top", 1)}></button>
                <button className="right-arrow bottom-arrow" id="right-bottom-arrow" title="change bottom" onClick={() => onArrowClick("bottom", 1)}></button>
                <button className="right-arrow shoe-arrow" id="right-shoe-arrow" title="change shoe" onClick={() => onArrowClick("shoe", 1)}></button>
            </div>
            <img id="paper-background" src="./src/assets/background.PNG" alt="background image"></img>
            <img id="mannequin-img" src="./src/assets/mannequin.PNG" alt="mannequin image"></img>
        </div>
    );
};

export default MannequinDisplay;