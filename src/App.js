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
            setSizeX([...Array(parseInt(input)).keys()]);
        } else if (parameter === "sizeY") { 
            setSizeY([...Array(parseInt(input)).keys()]);
        } else if (parameter === "startX") {
            setStartX(parseInt(input));
        } else if (parameter === "startY") { 
            setStartY(parseInt(input));
            setTableLoaded(true);
        };
        setInput("");
    };

    return (
        _mounted &&
        <>
            <div className="header">
                TableCross
            </div>
            { !tableLoaded ?
                <div className="page-container">
                    { manageInputFields() }
                </div>
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