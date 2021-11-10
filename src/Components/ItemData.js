import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import { Form, Button, Row, Col, Card } from "react-bootstrap";



function ItemList() {
    let history = useHistory();
    const [list, setList] = useState([]);
    const [nameToBeUpdate, setNameToUpdate] = useState('');
    const [ageToBeUpdate, setAgeToUpdate] = useState('');
    const [id, setId] = useState(null);
    const [disable, setDisable] = React.useState(false);
    const [loginuserid, setUserId] = useState('');
    const [userRecord, setUserRecord] = useState([]);
    const Record = [];


    useEffect(() => {
        setList(JSON.parse(localStorage.getItem('data')));
        setUserId(JSON.parse(localStorage.getItem('userid')));
        console.log(list, 'data', loginuserid, 'userid')
        for (let i = 0; i < list.length; i++) {
            if (list[i].userid === loginuserid) {
                Record.push(list[i])
                setUserRecord(Record)
                console.log('id match', userRecord, 'userRecord')
            }
        }
        console.log(userRecord, '-----------------')
    }, [list, userRecord]);

    function logoutClick() {
        localStorage.removeItem('userid');
        history.push("/");
    }

    function backtoAddItemClick() {
        history.push("/Modals");
    }

    const handleDelete = (id) => {
        setUserRecord(userRecord.splice(id, 1));
        console.log(userRecord,'delteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        localStorage.setItem('data', JSON.stringify(userRecord));
        // setList(list.splice(id, 1));
        // localStorage.setItem('data', JSON.stringify(list));
    }

    const handleUpdate = (item, id) => {
        setNameToUpdate(item.name);
        setAgeToUpdate(item.age);
        setId(id);
        setDisable(false)
    }

    const handleSave = (id) => {
        let prevData = JSON.parse(localStorage.getItem('data'));
        let objectToBeUpdate = prevData[id];
        objectToBeUpdate['name'] = nameToBeUpdate;
        objectToBeUpdate['age'] = ageToBeUpdate;
        prevData.splice(id, 1, objectToBeUpdate);
        localStorage.setItem('data', JSON.stringify(prevData));
        setDisable(true);
    }

    return (
        <div>
            <div class="card">
            <Button variant="primary" size="sm" onClick={backtoAddItemClick}>
                Add more item
            </Button>

                <div class="card-body">
                    {(userRecord.map((item, index) => {
                        return (
                            <div key={index}>
                                {!disable ? (<>
                                    <input hidden={id !== index} type="text" defaultValue={nameToBeUpdate} onChange={(e) => setNameToUpdate(e.target.value)}></input>
                                    <input hidden={id !== index} type="text" defaultValue={ageToBeUpdate} onChange={(e) => setAgeToUpdate(e.target.value)}></input>
                                    <Button variant="primary" size="sm" disabled={disable} hidden={id !== index} onClick={() => handleSave(index)}>Save</Button>
                                </>) : null}
                                <li>{item.name} is {item.age} years old.
                                    <span style={{ padding: 20 }}>
                                        <Button variant="primary" size="sm" onClick={() => handleDelete(index)}>
                                            Delete
                                        </Button>
                                    </span>
                                    <span style={{ padding: 20 }}>
                                        <Button variant="primary" size="sm" onClick={() => handleUpdate(item, index)}>
                                            Update
                                        </Button>
                                    </span>
                                </li>

                            </div>
                        )
                    }))}
                </div>
            </div>

            <Button variant="primary" size="sm" onClick={logoutClick}>
                Back to Login
            </Button>
            {/* <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => handleDelete(index)}>
                                    Delete
                                    </Button>
                                    <Button variant="primary" size="sm" onClick={() => handleUpdate(item, index)}>
                                    Update
                                    </Button>
                                    
                                    <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>Delete</button>
                                    <button onClick={() => handleUpdate(item, index)} style={{ marginLeft: '5px' }}>Update</button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table> */}

        </div>
    )
}

export default ItemList
