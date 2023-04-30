import { db } from "../../fire.js";
import { doc, setDoc, addDoc, query, collection, getDocs, where } from "firebase/firestore";

// This function retrieves all appointments for a given person thru email
export async function getAllApp(email) {

    var appts = []

    // Query appointments collection where the host is equal to the given email
    const q = query(collection(db, "appointments"), where("host", "==", email));
    const querySnapshot = await getDocs(q);

    // Iterate through the query snapshot and push each appointment to the appts array
    querySnapshot.forEach((doc) => {
        let a = doc.data();
        a.id = doc.id;
        appts.push(a)
    });

    return appts;
}

// This function adds a new appointment to the appointments collection
export async function addAppt(appt) {

    // Add the appointment document to the appointments collection
    const docRef = await addDoc(collection(db, "appointments"), appt);

    // Set the appointment id to the newly created document id
    appt.id = docRef.id;

    return appt;
}

// This function updates an existing appointment in the appointments collection
export async function updateAppt(appt) {

    let ind = appt.ind;
    
    delete appt.ind;

    // Set the appointment document with the given id to the new appointment object
    await setDoc(doc(db, "appointments", appt.id), appt)
        .then((document) => {
            // If successful, return the updated appointment and the original index of the appointment
            return [appt,ind];
        }
        )
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });

    // Return the updated appointment and the original index of the appointment
    return [appt,ind];
}

// This function adds a new invite to the invites collection
export async function addInvite(inv) {

    // Set the invite document with the given id to the new invite object
    await setDoc(doc(db, "invites", inv.id), inv)
        .then((document) => {
            return inv;
        }
        )
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });

    return false;
}

// This function retrieves all invites for a given user id
export async function getAllInvites(uid) {

    var invs = []

    // Query invites collection where the people array contains the given uid
    const q = query(collection(db, "invites"), where('people', 'array-contains-any', [uid]));

    const querySnapshot = await getDocs(q);

    // Iterate through the query snapshot and push each invite to the invs array
    querySnapshot.forEach((doc) => {
        invs.push(doc.data())
    });

    return invs;
}
