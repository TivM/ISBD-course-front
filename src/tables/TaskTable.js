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
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [complexity, setComplexity] = useState();
    const [status, setStatus] = useState();
    const [productivityStatisticsId, setProductivityStatisticsId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            startDate: startDate,
            endDate: endDate,
            complexity: complexity,
            status: status,
            productivityStatisticsId: productivityStatisticsId
        };

        fetch('http://localhost:8080/task/add', {
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
                <label htmlFor="startDate">startDate</label>
                <input type="date" className="form-control" id="startDate" value={startDate}
                       onChange={e => setStartDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="endDate">endDate</label>
                <input type="date" className="form-control" id="endDate" value={endDate}
                       onChange={e => setEndDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="complexity">complexity</label>
                <input type={"number"} className="form-control" id="complexity" value={complexity}
                       onChange={e => setComplexity(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="status">status</label>
                <input className="form-control" id="status" value={status}
                       onChange={e => setStatus(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="productivityStatisticsId">productivityStatisticsId</label>
                <input type={"number"} className="form-control" id="productivityStatisticsId" value={productivityStatisticsId}
                       onChange={e => setProductivityStatisticsId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default function TaskTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/task/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.taskResponses);
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
            <p className="Table-header">Рабочие задачи</p>
            <tbody>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Complexity</th>
                <th>Status</th>
                <th>Productivity Statistics Id</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.complexity}</td>
                    <td>{item.status}</td>
                    <td>{item.productivityStatisticsId}</td>
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