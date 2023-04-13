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










// export function signupUser(user, setLoader) {
//     return async dispatch => {
//         let registeredUser
//         if (user.email && user.password && user.name) {
//             try {
//                 registeredUser = await auth().createUserWithEmailAndPassword(user.email, user.password);
//                 delete user.password;
//                 user.uid = registeredUser.user.uid;
//                 let typeClone = user.type;
//                 await firestore().collection(typeClone).doc(user.uid).set(user)
//                 dispatch({ type: USER_REGISTERED, payload: user })
//                 setLoader(true);

//             } catch (err) {

//                 Alert.alert(err.code);
//             }
//         } else {
//             setLoader(false);

//             Alert.alert("ENTER VALID INFO!");
//         }
//     }
// }

// export function updateUser(user, setLoader) {
//     return async dispatch => {
//         try {
//             let uid = user.uid;
//             let updateImagePath = await fetch(user.photoLink);
//             const blob = await updateImagePath.blob();
//             let imageRef = storage().ref(`DP/${uid}`);
//             await imageRef.put(blob);
//             let url = await imageRef.getDownloadURL();
//             user.photoLink = url;
//             let typeClone = user.type;
//             let updateUser = await firestore().collection(typeClone).doc(uid).update(user);
//             await dispatch({ type: USER_UPDATE, payload: user })
//             setLoader(false)
//             let allItems = await firestore().collection('ITEMS').where("seller.uid", "==", uid).get();
//             allItems.forEach(
//                 async function (doc) {
//                     let item = doc.data()
//                     item.id = doc.id;
//                     await firestore().collection('ITEMS').doc(item.id).update({
//                         seller: user
//                     })
//                 })

//         } catch (err) {
//             setLoader(false);

//             Alert.alert(err.code);
//         }
//     }
// }


// export function loginUser(user, setLoader) {
//     return async dispatch => {
//         if (user.email && user.password) {
//             try {
//                 let authenticatedUser = await auth().signInWithEmailAndPassword(user.email, user.password);
//                 delete user.password;
//                 user.uid = authenticatedUser.user.uid;
//                 let uid = user.uid;
//                 let typeClone = user.type;
//                 let userFound = await firestore().collection(typeClone).doc(uid).get();
//                 dispatch({ type: USER_REGISTERED, payload: userFound.data() })
//                 // setLoader(false);
//             } catch (err) {
//                 setLoader(false);
//                 Alert.alert(err.code);
//             }
//         } else {
//             setLoader(false);
//             Alert.alert("ENTER VALID INFO!");
//         }


//     }
// }

// export function fetchUserInfo(uid) {
//     return async dispatch => {
//         let userFound = await firestore().collection('CUSTOMER').doc(uid).get();
//         if (userFound) {
//             dispatch({ type: USER_REGISTERED, payload: userFound.data() })
//         } else {
//             let userFound = await firestore().collection('RESTAURANT').doc(uid).get();
//             if (userFound) {
//                 dispatch({ type: USER_REGISTERED, payload: userFound.data() })
//             } else {
//                 let userFound = await firestore().collection('ADMIN').doc(uid).get();
//                 if (userFound) {
//                     dispatch({ type: USER_REGISTERED, payload: userFound.data() })
//                 }
//             }
//         }

//     }
// }






// export function logout(setLoader) {
//     return async dispatch => {

//         try {
//             await auth().signOut().then(() => {
//                 dispatch({ type: USER_LOGOUT })
//                 dispatch({ type: EMPTY_ITEMS })
//                 setLoader(false)
//             })
//         } catch (err) {
//             setLoader(false)
//             Alert.alert(err.code)
//         }
//     }
// }
