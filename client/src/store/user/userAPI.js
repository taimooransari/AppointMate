import { db, auth } from "../../fire.js";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore";




export async function signupUser(user) {
    var regUser = null;
    // if (user.email && user.password && user.name) {


    await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed in 
            let tmp = userCredential.user;

            delete user.password;
            user.uid = tmp.uid;

            // regUser = user;
            // ...
        })
        .catch((error) => {
            //   const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

    await setDoc(doc(db, "users", user.uid), user)
        .then((document) => {
            regUser = user;
        }
        )
        .catch((error) => {
            //   const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

    return regUser;
}





export async function logout() {
    await signOut(auth)
        .catch((error) => {
            //   const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
}





export async function loginUser(user) {
    var regUser = null;
    // if (user.email && user.password && user.name) {


    await signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed in 
            let tmp = userCredential.user;

            delete user.password;
            user.uid = tmp.uid;

            // regUser = user;
            // ...
        })
        .catch((error) => {
            //   const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        regUser = docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    return regUser;
}
