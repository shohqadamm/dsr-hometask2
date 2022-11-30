import React from "react";
import "./App.css";
import catNames from "cat-names";
import { v4 as uuidv4 } from "uuid";

import Cat from "./Cat";
import { click } from "@testing-library/user-event/dist/click";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cats: [],
            adobtedCats: [],
        };
        this.intervalCreateCat = null;
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
        if (this.intervalCreateCat) {
            clearInterval(this.intervalCreateCat);
        }
        this.intervalCreateCat = setInterval(() => {
            let id = uuidv4();
            let name = catNames.random();
            let color =
                this.colors[Math.floor(Math.random() * this.colors.length)];
            let collar = Math.random() < 0.5;
            let age = Math.floor(Math.random() * 5);
            let newCat = { id, name, color, collar, age, isHungary: true };
            if (!collar) {
                this.setState((prevState) => {
                    return {
                        adobtedCats: [...prevState.adobtedCats, newCat],
                    };
                });
            }
            this.setState((prevState) => {
                return {
                    cats: [...prevState.cats, newCat],
                };
            });
            // console.table(this.state.adobtedCats);
            // console.table(this.state.cats);

            this.makeCatHungry(newCat);
        }, 5000);

        if (this.makeHungaryCat) {
            clearInterval(this.makeHungaryCat);
        }
        // this.makeHungaryCat = setInterval(() => {
        //   setTimeout(() => {
        //         let adobtedCatsCopy = this.state.adobtedCats;
        //         adobtedCatsCopy.map((cat, index) => {
        //             if (cat.isHungary) {
        //                 let smth = this.state.adobtedCats.splice(index, 1);
        //                 console.log("id of spliced el", smth[0].id);
        //                 this.state.adobtedCats.splice(index, 1);
        //                 this.setState((prevState) => {
        //                     return {
        //                         cats: prevState.cats.filter(
        //                             (cat) => cat.id !== smth[0].id
        //                         ),
        //                     };
        //                 });
        //                 // this.state.cats.filter((cat) => cat.id !== smth[0].id);
        //             }
        //             return true;
        //         });
        //     }, 5000);
        // }, 1);
    }
    // componentDidUpdate() {}
    feed = (id) => {
        console.log("clicked");
        let catIdx = this.state.adobtedCats.findIndex((x) => x.id === id);
        console.log(catIdx);
        let clickedCat = this.state.adobtedCats[catIdx];
        let newCats = [...this.state.adobtedCats];
        clickedCat.isHungary = false;
        newCats[catIdx] = clickedCat;
        this.setState({ adobtedCats: [...newCats] });
        console.log("state updated");

        setTimeout(() => {
            clickedCat.isHungary = true;
            let catsTimeout = [...this.state.adobtedCats];
            catsTimeout[catIdx] = clickedCat;
            this.setState({ adobtedCats: [...newCats] });

            this.makeCatHungry(clickedCat);
        }, 10000);
    };

    makeCatHungry = (_cat) => {
        setTimeout(() => {
            // let adobtedCatsCopy = this.state.adobtedCats;
            // adobtedCatsCopy.map((cat, index) => {
            if (_cat.isHungary) {
                // let smth = this.state.adobtedCats.splice(index, 1);
                // console.log("id of spliced el", smth[0].id);
                // this.state.adobtedCats.splice(index, 1);
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
                // this.state.cats.filter((cat) => cat.id !== smth[0].id);
            }
            //     return true;
            // });
        }, 5000);
    };

    componentWillUnmount() {
        clearInterval(this.intervalCreateCat);
        clearInterval(this.makeHungaryCat);
    }

    render() {
        return (
            <div className="App">
                <div className="generated--cats">
                    {this.state.cats.map((cat) => (
                        <Cat key={cat.id} cat={cat} />
                    ))}
                </div>
                <div className="adobted--cats">
                    {this.state.adobtedCats.map((cat, index) => (
                        <Cat
                            key={cat.id}
                            cat={cat}
                            isHungary={cat.isHungary}
                            handleClick={this.feed}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
