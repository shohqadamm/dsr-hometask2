import React from "react";
import "./App.css";
import catNames from "cat-names";
import { v4 as uuidv4 } from "uuid";

import Cat from "./Cat";
class App extends React.Component {
    constructor() {
        super();
        this.state = { cats: [], adobtedCats: [] };

        // this.generateCat = this.generateCat.bind(this);
    }
    catNames = [
        "Whiskers",
        "Felix",
        "Oscar",
        "Smudge",
        "Fluffy",
        "Angel",
        "Lady",
        "Lucky",
    ];
    colors = [
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

    componentDidMount() {
        const intervalCreateCat = setInterval(() => {
            let id = uuidv4();
            let name = catNames.random();
            // this.catNames[Math.floor(Math.random() * this.catNames.length)];
            let color =
                this.colors[Math.floor(Math.random() * this.colors.length)];
            let collar = Math.random() < 0.5;
            let age = Math.floor(Math.random() * 5);
            if (!collar) {
                this.setState((prevState) => {
                    return {
                        adobtedCats: [
                            ...prevState.adobtedCats,
                            { id, name, color, collar, age, isHungary: true },
                        ],
                    };
                });
            }
            this.setState((prevState) => {
                return {
                    cats: [...prevState.cats, { id, name, color, collar, age }],
                };
            });
        }, 1000);
        // console.log(id, name, color, age, collar);
        // const intervalHungryCat = setInterval(() => {}, 5000);
        return { intervalCreateCat };
    }

    feed = (id) => {
        let catIdx = this.state.adobtedCats.findIndex((x) => x.id === id);
        console.log(catIdx, id);
        let clickedCat = this.state.adobtedCats[catIdx];
        const newCats = [...this.state.adobtedCats];
        clickedCat.isHungary = false;
        newCats[catIdx] = clickedCat;
        this.setState({ adobtedCats: [...newCats] });
    };

    render() {
        return (
            <div className="App">
                <div className="generated--cats">
                    {this.state.cats.map((cat) => (
                        <Cat cat={cat} />
                    ))}
                </div>
                <div className="adobted--cats">
                    {this.state.adobtedCats.map((cat, index) => (
                        <Cat cat={cat} handleClick={this.feed} />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
