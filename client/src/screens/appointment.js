import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import {
    selectUser,
    fetchAll,
    // selectAll
} from '../store/user/authSlice';
import { fetchApp, selectAppts, createApp, updateApp } from '../store/appointment/appSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Form } from "react-bootstrap";
import PairingHeap from "../pairingHeap";
import { or } from "firebase/firestore";




// function ApptComponent(props) {


//     const appts = props.appt.lst;
//     console.log(appts);
//     return (
//         <div style={{ border: "1px solid black", display: "flex", flexFlow: "column wrap" }}>
//             <h1>Your Appointments</h1>
//             {appts.map(function (a, i) {

//                 return (
//                     // style={{border: "1px solid black", display: "inline"}}
//                     <div >
//                         {a.id}
//                     </div>
//                 )
//             }

//             )}
//         </div>


//     );

// }


function AppointmentScreen() {

    // var UsersArr = useSelector(selectAll);
    // console.log(UsersArr);

    var user = useSelector(selectUser);
    const myAppt = useSelector(selectAppts);
    // console.log(myAppt);

    const [ListOfAppointments, setListOfApp] = useState([]);

    const [queue, setQueue] = useState(new PairingHeap());
    const [next, setNext] = useState(null);


    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("NEW MEETING");
    const [message, setMessage] = useState("Please accept my appointment request.");
    const [datetime, setDateTime] = useState(new Date());
    const [name, setName] = useState("example@gmail.com");



    // const [showCancel, setShowCancel] = useState(false);
    // const [showTaken, setShowTaken] = useState(false);
    // const [showPending, setShowPending] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Scheduled");


    useEffect(() => {
        if (myAppt.length > 0) {
            let order = [];
            let q = new PairingHeap;
            for (let i = 0; i < myAppt.length; i++) {
                let a = { ...myAppt[i], ind: i };
                // a.ind = i;
                // console.log("ind ",a)
                q.insert(a.timestamp, a);

            }
            setQueue(Object.assign({}, q));

            while (!q.is_empty()) {
                order.push(q.delete_min());
            }
            setNext(order[0]);
            setListOfApp(order);
            // console.log("next", next)
        }
    }, [myAppt])


    useEffect(() => {

        dispatch(fetchAll(user.uid));
        dispatch(fetchApp(user.email));

    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {

        let aptData =
        {
            subject: subject, message: message, timestamp: datetime.getTime(), host: user.email, with: name, status: "Scheduled",
        }
        dispatch(createApp(aptData))
        handleClose();
    }
    const updateDetails = (data) => {
        dispatch(updateApp(data))

    }


    return (
        <div>





            <h1>All Appointments</h1>



            <>
                <Button variant="primary" onClick={handleShow}>
                    Add Appointment
                </Button>

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Create Appointment </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>




                        {/* <AddAppointment /> */}

                        <div>
                            {/* <Form onSubmit={handleSubmit} className="p-3"> */}
                            <Form.Label>Appointment Time:</Form.Label><br />
                            <DateTimePicker onChange={setDateTime} value={datetime} minDate={new Date()} amPmAriaLabel="Select AM/PM" />


                            <Form.Group>
                                <Form.Label>With:</Form.Label>
                                <Form.Control type="text" placeholder="Sir Qasim" value={name} onChange={(event) => setName(event.target.value)} />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Subject:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Message:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Message" value={message} onChange={(event) => setMessage(event.target.value)} />
                            </Form.Group>


                            {/* </Form> */}

                        </div>

                        {/*  */}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Schedule
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <Form>
                <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="Upcoming"
                        name="group1"
                        type={"radio"}
                        id={`inline-radio-1`}
                        value="Scheduled"
                        checked={selectedOption === "Scheduled"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <Form.Check
                        inline
                        label="Cancelled"
                        name="group1"
                        type={"radio"}
                        id={`inline-radio-2`}
                        value="Cancelled"
                        checked={selectedOption === "Cancelled"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <Form.Check
                        inline
                        name="group1"
                        label="Taken"
                        type={"radio"}
                        id={`inline-radio-3`}
                        value="Taken"
                        checked={selectedOption === "Taken"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                </div>
            </Form>
            <AppCard lst={ListOfAppointments} isUpcoming={false} func={updateDetails} status={selectedOption} />

        </div>

    )
}


function AppCard(props) {
    return (
        <div style={{
            border: !props.isUpcoming ? "1px solid black" : "none",

            display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly"
        }}>


            {props.lst.map(function (a, i) {

                let date = new Date(a.timestamp);
                let check = a.status === props.status;
                let isCancel = "Scheduled" === a.status;
                if (!check) {
                    return null
                }
                return (

                    <div style={{ border: "1px solid black", margin: "10px", padding: "10px", minWidth: "20%" }}>
                        <b> {a.ind} </b>
                        <p><b>With: </b> {a.with} </p>
                        <p> {date.toLocaleDateString()} </p>
                        <p> {date.toLocaleTimeString()} </p>
                        <p> {a.status} </p>
                        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>

                            {!props.isUpcoming ? <>


                                {isCancel ? <Button onClick={
                                    () => {
                                        a.status = "Cancelled";
                                        props.func(a);
                                    }}>Cancel </Button> : null}



                                <Button >Details</Button>
                            </> : <>

                                <p>{a.message}</p>
                            </>}
                        </div>
                    </div>

                )

            }

            )}
        </div>
    )
}





export default AppointmentScreen;