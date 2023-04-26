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





            <h1>Upcoming</h1>


            {next ? <AppCard lst={[next]} isUpcoming={true} /> : null}


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

            <h1>All Appointments</h1>

            <AppCard lst={ListOfAppointments} isUpcoming={false} func={updateDetails} />

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
                return (

                    <div style={{ border: "1px solid black", margin: "10px", padding: "10px", minWidth: "20%" }}>
                        <b> {a.ind} </b>
                        <p><b>With: </b> {a.with} </p>
                        <p> {date.toLocaleDateString()} </p>
                        <p> {date.toLocaleTimeString()} </p>
                        <p> {a.status} </p>
                        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>

                            {!props.isUpcoming ? <>
                                <Button onClick={
                                    () => {
                                        a.status = "Cancelled";
                                        props.func(a);



                                    }

                                }>Cancel </Button>
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