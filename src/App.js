import React, { useState, useEffect, useRef } from 'react';
import Game from './Game';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Form } from 'react-bootstrap';

const App = () => {
    const [_mounted, setMounted] = useState(false);
    const [input, setInput] = useState("");
    const [sizeX, setSizeX] = useState(null);
    const [sizeY, setSizeY] = useState(null);
    const [startX, setStartX] = useState(null);
    const [startY, setStartY] = useState(null);
    const [tableLoaded, setTableLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState([false, null]);

    var inputRef = useRef(null);

    useEffect( () => {
        setMounted(true);
    }, []);

    useEffect( () => {
        if (_mounted) inputRef.focus();
    }, [_mounted]);

    const manageInputFields = () => {
        if (!sizeX) { return renderInputFields("sizeX", "Enter size of table in x direction") }
        else if (!sizeY) { return renderInputFields("sizeY", "Enter size of table in y direction") }
        else if (!startX) { return renderInputFields("startX", "Enter starting position in x direction") }
        else if (!startY) { return renderInputFields("startY", "Enter starting position in y direction") };
    };

    const renderInputFields = (parameter, label) => {
        return(
            <Form>
                <Form.Label>
                    { label }
                </Form.Label>
                <Form.Control
                    as="textarea"
                    value={input}
                    ref={r => (inputRef = r)}
                    onChange={e => setVariable(parameter, e.target.value)} rows="1"
                />
            </Form>
        );
    };

    const setVariable = (parameter, input) => {
        if (parameter === "sizeX") { 
            if (Number.isInteger(parseInt(input)) && parseInt(input) >= 2) {
                setSizeX([...Array(parseInt(input)).keys()]);
                setErrorMessage([false, null]);
            } else {
                setErrorMessage([true, 1]);
            };
        } else if (parameter === "sizeY") { 
            if (Number.isInteger(parseInt(input)) && parseInt(input) >= 2) {
                setSizeY([...Array(parseInt(input)).keys()]);
                setErrorMessage([false, null]);
            } else {
                setErrorMessage([true, 1]);
            };
        } else if (parameter === "startX") {
            if (Number.isInteger(parseInt(input))) {
                if (parseInt(input) < sizeX.length) {
                    setStartX(parseInt(input));
                    setErrorMessage([false, null]);
                } else {
                    setErrorMessage([true, 3]);
                }
            } else {
                setErrorMessage([true, 2]);
            };
        } else if (parameter === "startY") {
            if (Number.isInteger(parseInt(input))) {
                if (parseInt(input) < sizeY.length) {
                    setStartY(parseInt(input));
                    setErrorMessage([false, null]);
                    setTableLoaded(true);
                } else {
                    setErrorMessage([true, 3]);
                }
            } else {
                setErrorMessage([true, 2]);
            };
        };
        setInput("");
    };

    const displayErrorMessage = () => {
        return(
            <div className="error-message">
                { errorMessage[1] === 1 &&
                    <>
                        Please enter a valid integer between 2 and 9.
                    </>
                }
                { errorMessage[1] === 2 &&
                    <>
                        Please enter a valid integer.
                    </>
                }
                { errorMessage[1] === 3 &&
                    <>
                        The start position needs to be on the table.
                        { startX ?
                            ` [0, ${sizeY.length-1}]`
                        :
                            ` [0, ${sizeX.length-1}]`
                        }
                    </>
                }
            </div>
        );
    };

    return (
        _mounted &&
        <>
            <div className="header">
                TableCross
            </div>
            { !tableLoaded ?
                <>
                    <div className="page-container">
                        { manageInputFields() }
                    </div>
                    { errorMessage &&
                        displayErrorMessage()
                    }
                </>
            :
                <Game
                    sizeX={sizeX}
                    sizeY={sizeY}
                    startX={startX}
                    startY={startY}
                    rotation={"north"}
                />
            }
        </>
    );
};

export default App;