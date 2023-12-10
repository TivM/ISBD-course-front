import React, { useState, useEffect } from 'react';
import './Table.css';
import foodLogo from "../icons/icons8-kawaii-broccoli-50.png";
import plusLogo from '../icons/icons8-plus-64.png';


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
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [division, setDivision] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            age: age,
            division: division
        };

        fetch('http://localhost:8080/admin/add', {
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
                <label htmlFor="name">Name</label>
                <input className="form-control" id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" className="form-control" id="age" placeholder="69" value={age} onChange={e => setAge(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="division">Division</label>
                <input className="form-control" id="division" value={division} onChange={e => setDivision(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function AdminTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/admin/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.adminResponses);
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
            <p className="Table-header">Админы</p>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Division</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.division}</td>
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