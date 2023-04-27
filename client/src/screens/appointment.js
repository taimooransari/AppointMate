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


    var user = useSelector(selectUser);
    const myAppt = useSelector(selectAppts);


    const [ListOfAppointments, setListOfApp] = useState([]);

    const [queue, setQueue] = useState(new PairingHeap());
    const [next, setNext] = useState(null);



    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("NEW MEETING");
    const [message, setMessage] = useState("Please accept my appointment request.");
    const [datetime, setDateTime] = useState(new Date());
    const [name, setName] = useState("example@gmail.com");

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

        // dispatch(fetchAll(user.uid));
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
                    <Form.Check
                        inline
                        name="group1"
                        label="Missed"
                        type={"radio"}
                        id={`inline-radio-3`}
                        value="Missed"
                        checked={selectedOption === "Missed"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                </div>
            </Form>
            <AppCard lst={ListOfAppointments} isUpcoming={false} func={updateDetails} status={selectedOption} />
        </div>

    )
}


function AppCard(props) {

    const [detailApp, setDetailApp] = useState({});


    const [detailShow, setDetailShow] = useState(false);

    return (
        <div style={{
            border: !props.isUpcoming ? "1px solid black" : "none",

            display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly"
        }}>


            {props.lst.map(function (a, i) {

                if (a.timestamp < (new Date()).getTime() && a.status == "Scheduled") {
                    a.status = "Missed";
                    console.log("misss", a);
                    props.func(a);
                }

                let date = new Date(a.timestamp);
                let check = a.status === props.status;
                let isCancel = "Scheduled" === a.status;
                let isMissed = "Missed" === a.status;
                if (!check) {
                    return null
                }
                return (

                    <div style={{ border: "1px solid black", margin: "10px", padding: "10px", minWidth: "20%" }}>
                        <b> {a.id} </b>
                        <p><b>With: </b> {a.with} </p>
                        <p> {date.toLocaleDateString()} </p>
                        <p> {date.toLocaleTimeString()} </p>
                        <p> {a.status} </p>
                        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>

                            <>


                                {isCancel ? <Button onClick={
                                    () => {
                                        a.status = "Cancelled";
                                        props.func(a);
                                    }}>Cancel </Button> : null}

                                {isMissed ? <Button onClick={
                                    () => {
                                        a.status = "Taken";
                                        props.func(a);
                                    }}>Mark Taken </Button> : null}



                                <Button onClick={() => { setDetailApp(a); setDetailShow(true); console.log("details", detailApp); }} >Details</Button>
                            </>

                        </div>
                    </div>

                )

            }

            )}
            <DetailsModal show={detailShow} setShow={setDetailShow} appt={detailApp} func={props.func} />

        </div>
    )
}


function DetailsModal(props) {

    const appt = props.appt;
    let date = new Date(appt.timestamp);

    const hideModal = () => {
        props.setShow(false);
    }

    // const markTaken = (a) => {
    //     // let tmp = Object.assign({}, appt);
    //     // const tmp = Object.assign({}, appt);
    //     a.status = "Taken";

    //     console.log("mark func", a);
    //     props.func(a);


    // }



    return (

        <>
            <Modal show={props.show} onHide={hideModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>




                    {/* <AddAppointment /> */}

                    <div>

                        <h1>{appt.ind}</h1>

                        <p><b>With: </b> {appt.with} </p>
                        <p><b>Date: </b> {date.toLocaleDateString()} </p>
                        <p><b>Time: </b> {date.toLocaleTimeString()} </p>
                        <p> <b>Status: </b> {appt.status} </p>
                        <p><b>Message: </b>  {appt.message} </p>

                    </div>

                    {/*  */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>


                    {/* {isMissed ? <Button variant="primary" onClick={() => { console.log("button", appt); markTaken(appt); }}>
                        Mark Taken
                    </Button> : null} */}


                </Modal.Footer>
            </Modal>
        </>

    )
}





export default AppointmentScreen;