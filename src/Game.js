import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'react-bootstrap';

class Game extends React.Component {
    state = {
        _mounted: false,
        maxTableSize: 400,
        currentPosition: [null, null, null],
        finished: false,
        onTable: true
    };

    handleKeyPress = (e) => {
        e.preventDefault();
        if (e.key === '0') {
            this.setState({finished: true});
        } else if (e.key === '1') {
            this.moveForward();
        } else if (e.key === '2') {
            this.moveBackward();
        } else if (e.key === '3') {
            this.rotate("clockwise");
        } else if (e.key === '4') {
            this.rotate("counterclockwise");
        };
    };

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
        this.setState({currentPosition: [this.props.startX, this.props.startY, "north"], _mounted: true});
        return () => {
            window.removeEventListener("keydown", this.handleKeyPress);
        };
    };

    moveForward = () => {
        let currentPosition = this.state.currentPosition;
        if (currentPosition[2] === "north") {
            if (currentPosition[1] > 0) { currentPosition[1] = currentPosition[1]-1; }
            else { this.setState({finished: true, onTable: false}); };
        } else if (currentPosition[2] === "east") {
            if (currentPosition[0] < this.props.sizeX.length-1) { currentPosition[0] = currentPosition[0]+1; }
            else { this.setState({finished: true, onTable: false}); };
        } else if (currentPosition[2] === "south") {
            if (currentPosition[1] < this.props.sizeY.length-1) { currentPosition[1] = currentPosition[1]+1; } 
            else { this.setState({finished: true, onTable: false}); };
        } else if (currentPosition[2] === "west") {
            if (currentPosition[0] > 0) { currentPosition[0] = currentPosition[0]-1; } 
            else { this.setState({finished: true, onTable: false}); };
        };
        this.setState({currentPosition: currentPosition});
    };

    moveBackward = () => {
        let currentPosition = this.state.currentPosition;
        if (currentPosition[2] === "north") {
            if (currentPosition[1] < this.props.sizeY.length-1) { currentPosition[1] = currentPosition[1]+1; }
            else { this.setState({finished: true, onTable: false}); };
        } else if (currentPosition[2] === "east") {
            if (currentPosition[0] > 0) { currentPosition[0] = currentPosition[0]-1; }
            else { this.setState({finished: true, onTable: false}); };
        } else if (currentPosition[2] === "south") {
            if (currentPosition[1] > 0) { currentPosition[1] = currentPosition[1]-1; } 
            else { this.setState({finished: true, onTable: false}); };
        } else if (currentPosition[2] === "west") {
            if (currentPosition[0] < this.props.sizeX.length-1) { currentPosition[0] = currentPosition[0]+1; } 
            else { this.setState({finished: true, onTable: false}); };
        };
        this.setState({currentPosition: currentPosition});
    };

    rotate = (direction) => {
        let currentPosition = this.state.currentPosition;
        if (currentPosition[2] === "north") {
            currentPosition[2] = direction === "clockwise" ? "east" : "west";
        } else if (currentPosition[2] === "east") {
            currentPosition[2] = direction === "clockwise" ? "south" : "north";
        } else if (currentPosition[2] === "south") {
            currentPosition[2] = direction === "clockwise" ? "west" : "east";
        } else if (currentPosition[2] === "west") {
            currentPosition[2] = direction === "clockwise" ? "north" : "south";
        };
        this.setState({currentPosition: currentPosition});
    };

    directionToDegrees = () => {
        if (this.state.currentPosition[2] === "north") { return "270deg" }
        else if (this.state.currentPosition[2] === "east") { return "0deg" }
        else if (this.state.currentPosition[2] === "south") { return "90deg" }
        else if (this.state.currentPosition[2] === "west") { return "180deg" }
    };

    renderTable = () => {
        if (this.props.sizeX && this.props.sizeY) {
            return(
                <div className="table-container">
                    { this.props.sizeY.map(y => (
                        <div className="row">
                            { this.props.sizeX.map(x => (
                                <>
                                    { (x === this.state.currentPosition[0] && y === this.state.currentPosition[1]) ?
                                        <div
                                            className="square"
                                            style={{
                                                transform: `rotate(${this.directionToDegrees()})`,
                                                backgroundColor: "red",
                                                width: `calc(${this.state.maxTableSize}px/${this.props.sizeX.length})`,
                                                height: `calc(${this.state.maxTableSize}px/${this.props.sizeX.length})`
                                            }}
                                        >
                                            { "-->" }
                                        </div>
                                    :
                                        <div
                                            className="square"
                                            style={{
                                                width: `calc(${this.state.maxTableSize}px/${this.props.sizeX.length})`,
                                                height: `calc(${this.state.maxTableSize}px/${this.props.sizeX.length})`
                                            }}
                                        />
                                    }
                                </>
                            ))}
                        </div>
                    )) }
                    <div className="instructions">
                        0 = Quit game and print results<br />
                        1 = Move forward one step<br />
                        2 = Move backwards one step<br />
                        3 = Rotate clockwise 90 degrees<br />
                        4 = Rotate counterclockwise 90 degrees
                    </div>
                </div>
            );
        };
    };

    renderResultsScreen = () => {
        return(
            <div className="results-container">
                { this.state.onTable ?
                    <>
                        Final position: {`[${this.state.currentPosition[0]}, ${this.state.currentPosition[1]}]`}
                    </>
                :
                    <>
                        Final position: [-1, -1]
                    </>
                }
                <Button style={{marginTop: "30px"}} onClick={() => window.location.reload(false)}>
                    Restart!
                </Button>
            </div>
        );
    };

    render() {
        return (
            this.state._mounted &&
            <>
                { !this.state.finished ?
                    this.renderTable()
                :
                    this.renderResultsScreen()
                }
            </>
        );
    };
};

export default Game;