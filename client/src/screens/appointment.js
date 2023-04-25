import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import {
    selectUser,
    fetchAll,
    // selectAll
} from '../store/user/authSlice';
import { fetchApp, selectAppts, createApp } from '../store/appointment/appSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Form } from "react-bootstrap";





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
    var myAppt = useSelector(selectAppts);
    // console.log(myAppt);

    const dispatch = useDispatch();
    const [tempApt, setTempApt] = useState(myAppt);
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("NEW MEETING");
    const [message, setMessage] = useState("Please accept my appointment request.");
    const [datetime, setDateTime] = useState(new Date());
    const [email, setEmail] = useState("example@gmail.com");


    useEffect(() => {

        dispatch(fetchAll(user.uid));

        dispatch(fetchApp(user.email));
        console.log(69)
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        let host_email = user.email;
        let aptData =
        {
            subject: subject, message: message, datetime: datetime, timestamp: datetime.getTime(), people: [host_email, email], status: "Scheduled", taken: 0
        }
        dispatch(createApp(aptData))
        handleClose();
    }



    return (
        <div>
            <h1>{user.name}</h1>




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
                                <Form.Control type="email" placeholder="example@abc.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Subject:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Message:</Form.Label>
                                <Form.Control type="text" placeholder="Message" value={message} onChange={(event) => setMessage(event.target.value)} />
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






            {/* {!myAppt ?
                <h2>NONE</h2> :
                <ApptComponent appt={myAppt} />
            } */}
            <h1>Your Appointments</h1>
            <div style={{ border: "1px solid black", display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>


                {myAppt.lst.map(function (a, i) {

                    let ind = a.people.indexOf(user.email);

                    let ppl = a.people.splice(ind, 1);
                    ppl = ppl[0];
                    let date = new Date(a.timestamp);

                    return (

                        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                            <p> {a.id} </p>
                            <p> {ppl} </p>
                            <p> {date.toDateString()} </p>
                            <p> {date.toTimeString()} </p>
                            <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>
                                <Button color="#FF0000">Cancel </Button>
                                <Button onClick={() => {
                                    let d = new Date();
                                    if (a.timestamp < d.getTime()) {
                                        alert("edit")
                                    }

                                }}>Edit Appointment</Button>
                            </div>
                        </div>
                    )
                }

                )}
            </div>


        </div>

    )
}





export default AppointmentScreen;