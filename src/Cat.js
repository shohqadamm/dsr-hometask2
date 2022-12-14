import React, { Component } from "react";

export default class Cat extends Component {
    constructor() {
        super();
        this.state = {};
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
                    {this.props.cat.isHungary ? (
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
