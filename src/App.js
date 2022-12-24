import React from "react";
import "./App.css";
import catNames from "cat-names";
import { v4 as uuidv4 } from "uuid";

import Cat from "./Cat";
function App() {
    // constructor() {
    //     super();
    //     this.state = {
    //         cats: [],
    //         adobtedCats: [],
    //     };
    // }
    const [cats, setCats] = React.useState([]);
    const [adobtedCats, setAdobtedCats] = React.useState([]);
    let colors = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
    ];

    React.useEffect(() => {
        const intervalCreateCat = setInterval(() => {
            let id = uuidv4(),
                name = catNames.random(),
                color = colors[Math.floor(Math.random() * colors.length)],
                collar = Math.random() < 0.5,
                age = Math.floor(Math.random() * 5),
                isHungary = true,
                newCat = { id, name, color, collar, age, isHungary };
            if (!collar) {
                setAdobtedCats((prevState) => [
                    ...prevState,
                    { ...newCat, isHungary: true },
                ]);
            }
            setCats((prevState) => [
                ...prevState,
                { ...newCat, isHungary: false },
            ]);
            makeCatHungry({ ...newCat, isHungary: false });
        }, 5000);
        return () => clearInterval(intervalCreateCat);
    });
    const makeCatHungry = (_cat) => {
        setTimeout(() => {
            if (_cat.isHungary) {
                this.setState((prevState) => {
                    return {
                        cats: prevState.cats.filter(
                            (cat) => cat.id !== _cat.id
                        ),
                        adobtedCats: prevState.adobtedCats.filter(
                            (cat) => cat.id !== _cat.id
                        ),
                    };
                });
            } else return;
        }, 5000);
    };
    const feed = (id) => {
        let catIdx = adobtedCats.findIndex((x) => x.id === id);
        let clickedCat = adobtedCats[catIdx];
        let newCats = [...adobtedCats];
        clickedCat.isHungary = false;
        newCats[catIdx] = clickedCat;
        setAdobtedCats([...newCats]);

        setTimeout(() => {
            clickedCat.isHungary = true;
            let catsTimeout = [...adobtedCats];
            catsTimeout[catIdx] = clickedCat;
            setAdobtedCats([...catsTimeout]);

            makeCatHungry(clickedCat);
        }, 10000);
    };

    return (
        <div className="App">
            <div className="generated--cats">
                {cats.map((cat) => (
                    <Cat key={cat.id} cat={cat} />
                ))}
            </div>
            <div className="adobted--cats">
                {adobtedCats.map((cat) => (
                    <Cat key={cat.id} cat={cat} handleClick={feed} />
                ))}
            </div>
        </div>
    );
}

export default App();
