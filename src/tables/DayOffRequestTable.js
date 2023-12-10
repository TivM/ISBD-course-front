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
    const [isApproved, setIsApproved] = useState();
    const [employeeId, setEmployeeId] = useState();


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            startDate: startDate,
            endDate: endDate,
            isApproved: isApproved,
            employeeId: employeeId
        };

        fetch('http://localhost:8080/dayoff/add', {
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
                <label htmlFor="startDate">Start Date</label>
                <input type="date" className="form-control" id="startDate" value={startDate}
                       onChange={e => setStartDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input type="date" className="form-control" id="endDate" value={endDate}
                       onChange={e => setEndDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="isApproved">isApproved</label>
                <input type="checkbox" className="form-control" id="isApproved" value={isApproved}
                       onChange={e => setIsApproved(e.target.value)}/>
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


export default function DayOffRequestTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/dayoff/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.dayoffRequestResponses);
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
            <p className="Table-header">Отпуска</p>
            <tbody>
            <tr>
                <th>Start date</th>
                <th>End date</th>
                <th>Is Approved</th>
                <th>Employee id</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.isApproved}</td>
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