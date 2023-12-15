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
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            category: category,
            description: description
        };

        fetch('http://localhost:8080/course/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.exceptionMessage)
                    alert(data.exceptionMessage)
                else{
                    alert("Успех");
                    console.log('Success:', data);
                }
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
                <label htmlFor="description">Description</label>
                <input className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input className="form-control" id="category" value={category} onChange={e => setCategory(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function CourseTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/course/allCourses`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.courseResponses);
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
            <p className="Table-header">Курсы</p>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>description</th>
                <th>Category</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
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