import { db } from "../../fire.js";
import { doc, setDoc, addDoc, query, collection, getDocs, where } from "firebase/firestore";



export async function getAllApp(email) {


    var appts = []

    const q = query(collection(db, "appointments"), where("people", "array-contains", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let a = doc.data();
        a.id = doc.id;
        appts.push(a)
    });


    return appts;
}





export async function addAppt(appt) {


    const docRef = await addDoc(collection(db, "appointments"), appt);


    appt.id = docRef.id;

    return appt;
}



export async function addInvite(inv) {

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














export async function getAllInvites(uid) {


    var invs = []

    const q = query(collection(db, "invites"), where('people', 'array-contains-any', [uid]));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        invs.push(doc.data())
    });

    return invs;
}


