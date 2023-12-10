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
    const [date, setDate] = useState();
    const [managerReview, setManagerReview] = useState();
    const [adminId, setAdminId] = useState();
    const [employeeId, setEmployeeId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            date: date,
            managerReview: managerReview,
            adminId: adminId,
            employeeId: employeeId
        };

        fetch('http://localhost:8080/stat/add', {
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
                <label htmlFor="date">date</label>
                <input type="date" className="form-control" id="date" value={date}
                       onChange={e => setDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="managerReview">managerReview</label>
                <input className="form-control" id="managerReview" value={managerReview}
                       onChange={e => setManagerReview(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="adminId">adminId</label>
                <input type="number" className="form-control" id="adminId" value={adminId}
                       onChange={e => setAdminId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="employeeId">employeeId</label>
                <input type="number" className="form-control" id="employeeId" value={employeeId}
                       onChange={e => setEmployeeId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default function ProductivityStatisticsTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/stat/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.productivityStatisticsResponses);
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
            <p className="Table-header">Статистика продутивности</p>
            <tbody>
            <tr>
                <th>Date</th>
                <th>Employee Id</th>
                <th>Admin id</th>
                <th>Manager review</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.managerReview}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.adminId}</td>
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
