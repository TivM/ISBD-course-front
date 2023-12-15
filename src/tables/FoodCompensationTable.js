import React, { useState, useEffect } from 'react';
import './Table.css';
import plusLogo from "../icons/icons8-plus-64.png";
import cancelLogo from "../icons/icons8-money-buring-isolated-on-a-white-background-48.png"
import dollarlLogo from "../icons/icons8-dollar-2-50.png"


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
    const [paymentAmount, setPaymentAmount] = useState();
    const [compensationDate, setCompensationDate] = useState();
    const [isBreakfast, setIsBreakfast] = useState();
    const [employeeId, setEmployeeId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            paymentAmount: paymentAmount,
            compensationDate: compensationDate,
            isBreakfast: isBreakfast,
            employeeId: employeeId
        };

        fetch('http://localhost:8080/food/add', {
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
                <label htmlFor="paymentAmount">paymentAmount</label>
                <input type={"number"} className="form-control" id="paymentAmount" value={paymentAmount}
                       onChange={e => setPaymentAmount(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="compensationDate">compensationDate</label>
                <input type="date" className="form-control" id="compensationDate" value={compensationDate}
                       onChange={e => setCompensationDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="isBreakfast">isBreakfast</label>
                <input type="checkbox" className="form-control" id="isBreakfast" value={isBreakfast}
                       onChange={e => setIsBreakfast(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="employeeId">employeeId</label>
                <input type={"number"} className="form-control" id="employeeId" value={employeeId}
                       onChange={e => setEmployeeId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default function FoodCompensationTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/food/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.foodCompensationResponses);
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
        setIsModalOpenCancel(false);
        setIsModalOpenSum(false)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);

    const openModalCancel = () => {
        setIsModalOpenCancel(true);
        setIsModalOpen(false);
        setIsModalOpenSum(false)
    };

    const closeModalCancel = () => {
        setIsModalOpenCancel(false);
    };

    const [isModalOpenSum, setIsModalOpenSum] = useState(false);

    const openModalSum = () => {
        setIsModalOpenSum(true);
        setIsModalOpen(false);
        setIsModalOpenCancel(false)
    };

    const closeModalSum = () => {
        setIsModalOpenSum(false);
    };


    return (
        <div className={"content-div"}>
            <div className="left-div">
            <p className="Table-header">Компенсация питания</p>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Payment amount</th>
                <th>Compensation date</th>
                <th>Is Breakfast</th>
                <th>Employee Id</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.paymentAmount}</td>
                    <td>{item.compensationDate}</td>
                    <td>{item.isBreakfast ? "true" : "false"}</td>
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
                <button onClick={openModalCancel}><img src={cancelLogo} alt="cancel"/></button>
                <Modal isOpen={isModalOpenCancel} onClose={closeModalCancel}>
                    <FormCancel/>
                </Modal>
                <button onClick={openModalSum}><img src={dollarlLogo} alt="dollar"/></button>
                <Modal isOpen={isModalOpenSum} onClose={closeModalSum}>
                    <FormSum/>
                </Modal>
            </div>
        </div>
    );

}

const FormCancel = () => {
    const [employeeId, setEmployeeId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            employeeId: employeeId
        };

        fetch('http://localhost:8080/food/cancel/' + employeeId, {
            method: 'PUT',
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
                <label htmlFor="employeeId">employeeId</label>
                <input type={"number"} className="form-control" id="employeeId" value={employeeId}
                       onChange={e => setEmployeeId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

const FormSum = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [employeeId, setEmployeeId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            paymentAmount: startDate,
            compensationDate: endDate,
            employeeId: employeeId
        };

        fetch('http://localhost:8080/food/compsum?' +  new URLSearchParams({
            start: startDate,
            end: endDate,
            id: employeeId
        }),
            {
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                if (data.exceptionMessage)
                    alert(data.exceptionMessage)
                else{
                    alert(data.compensationSum);
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
                <label htmlFor="employeeId">employeeId</label>
                <input type={"number"} className="form-control" id="employeeId" value={employeeId}
                       onChange={e => setEmployeeId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};
