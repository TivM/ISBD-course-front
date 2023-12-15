import React, { useState, useEffect } from 'react';
import './Table.css';
import plusLogo from "../icons/icons8-plus-64.png";


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

const Form = () => {
    const [startTimestamp, setStartTimestamp] = useState();
    const [endTimestamp, setEndTimestamp] = useState();
    const [employeeId, setEmployeeId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp,
            employeeId: employeeId
        };

        fetch('http://localhost:8080/work/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                alert("Успех");
                console.log('Success:', data);
            })
            .catch((error) => {
                alert('Error: ' + error);
                console.error('Error:', error);
            });    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="startTimestamp">startTimestamp</label>
                <input type="time" className="form-control" id="startTimestamp" value={startTimestamp}
                       onChange={e => setStartTimestamp(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="endTimestamp">endTimestamp</label>
                <input type="time" className="form-control" id="endTimestamp" value={endTimestamp}
                       onChange={e => setEndTimestamp(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="employeeId">employeeId</label>
                <input type="number" className="form-control" id="employeeId" value={employeeId}
                       onChange={e => setEmployeeId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default function WorkTimeTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/work/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.workTimeResponses);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className={"content-div"}>
            <div className="left-div">
            <p className="Table-header">Рабочее время</p>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Start Timestamp</th>
                <th>End Timestamp</th>
                <th>Employee Id</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.startTimestamp}</td>
                    <td>{item.endTimestamp}</td>
                    <td>{item.employeeId}</td>
                </tr>
            ))}
            </tbody>
            </div>
            <div className={"right-div"}>
            <button onClick={openModal}><img src={plusLogo} alt="add entity"/></button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Form/>
            </Modal>
            </div>
        </div>
    );

}