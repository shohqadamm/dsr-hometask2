import React from "react";
import "./App.css";
import catNames from "cat-names";
import { v4 as uuidv4 } from "uuid";

import Cat from "./Cat";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cats: [],
            adobtedCats: [],
        };
        this.intervalCreateCat = null;
    }

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
                    cats: [...prevState.cats, { id, name, color, collar, age }],
                };
            });

            this.makeCatHungry(newCat);
        }, 5000);

        if (this.makeHungaryCat) {
            clearInterval(this.makeHungaryCat);
        }
    }
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
            this.setState({ adobtedCats: [...catsTimeout] });

            this.makeCatHungry(clickedCat);
        }, 10000);
    };

    makeCatHungry = (_cat) => {
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
            }
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
