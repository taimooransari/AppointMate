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
//     var myAppt = props.appt;

//     return (

//         myAppt.map((appt, i) => {
//             if (appt == null) {
//                 appt = { id: 0 }
//             }
//             return (

//                 <h2>{appt.id}</h2>
//             )
//         })

//     )

// }


function AppointmentScreen() {


    var user = useSelector(selectUser);

    // var UsersArr = useSelector(selectAll);
    // console.log(UsersArr);

    var myAppt = useSelector(selectAppts);

    const dispatch = useDispatch();




    useEffect(() => {
        dispatch(fetchAll(user.uid));
        dispatch(fetchApp(user.email));

    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {

        let host_email = user.email;

        let aptData =

        {

            subject: subject,
            message: message,
            datetime: datetime,
            timestamp: datetime.getTime(),
            people: [host_email, email],
            status: "Scheduled",
            taken: 0

        }

        console.log("dasbkjdblas",aptData);
        dispatch(createApp(aptData))

        handleClose();



    }


    const [subject, setSubject] = useState("NEW MEETING");
    const [message, setMessage] = useState("Please accept my appointment request.");
    const [datetime, setDateTime] = useState(new Date());
    const [email, setEmail] = useState("example@gmail.com");



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

            {/* {!myAppt ? null : <ApptComponent appt={myAppt} />} */}

        </div>

    )
}


// function AddAppointment(props) {

//     const [subject, setSubject] = useState("NEW MEETING");
//     const [message, setMessage] = useState("Please accept my appointment request.");
//     const [datetime, setDateTime] = useState(new Date());
//     const [email, setEmail] = useState("example@gmail.com");



//     return (
//         <div>
//             {/* <Form onSubmit={handleSubmit} className="p-3"> */}
//             <Form.Label>Appointment Time:</Form.Label><br />
//             <DateTimePicker onChange={setDateTime} value={datetime} minDate={new Date()} amPmAriaLabel="Select AM/PM" />


//             <Form.Group>
//                 <Form.Label>With:</Form.Label>
//                 <Form.Control type="email" placeholder="example@abc.com" value={email} onChange={(event) => setEmail(event.target.value)} />
//             </Form.Group>


//             <Form.Group>
//                 <Form.Label>Subject:</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
//             </Form.Group>

//             <Form.Group>
//                 <Form.Label>Message:</Form.Label>
//                 <Form.Control type="text" placeholder="Message" value={message} onChange={(event) => setMessage(event.target.value)} />
//             </Form.Group>


//             {/* </Form> */}

//         </div>
//     )
// }




export default AppointmentScreen;