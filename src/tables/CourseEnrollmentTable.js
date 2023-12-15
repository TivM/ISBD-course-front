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
    const [employeeDivision, setEmployeeDivision] = useState();
    const [courseId, setCourseId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            employeeDivision: employeeDivision,
            courseId: courseId
        };

        fetch('http://localhost:8080/course/toTeam', {
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
                <label htmlFor="employeeDivision">employeeDivision</label>
                <input className="form-control" id="employeeDivision" value={employeeDivision} onChange={e => setEmployeeDivision(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="courseId">courseId</label>
                <input className="form-control" id="courseId" value={courseId} onChange={e => setCourseId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function CourseEnrollmentTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/course/allCourseEnroll`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.courseEnrollmentResponses);
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
                <p className="Table-header">Записи на курсы</p>
                <tbody>
                <tr>
                    <th>Employee id</th>
                    <th>Course id</th>
                    <th>isFinished</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.employeeId}</td>
                        <td>{item.courseId}</td>
                        <td>{item.isFinished ? "true" : "false"}</td>
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