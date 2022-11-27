import React, { Component } from "react";

export default class Cat extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }
    componentDidMount() {
        setInterval(() => {
            // this.props.cat.isHungary = true;
            // this.state.counter += 1;
            console.log(this.state.counter);
        }, 5000);
    }
    render() {
        return (
            <>
                <div
                    key={this.props.cat.id}
                    style={{ backgroundColor: this.props.cat.color }}
                >
                    <h1>{this.props.cat.name}</h1>
                    <p>
                        {this.props.cat.collar
                            ? "has Collar"
                            : "you can adobt it"}
                    </p>
                    <p>{this.props.cat.age}</p>
                    {this.props.isHungary ? (
                        <button
                            onClick={() =>
                                this.props.handleClick(this.props.cat.id)
                            }
                        >
                            Feed
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </>
        );
    }
}
