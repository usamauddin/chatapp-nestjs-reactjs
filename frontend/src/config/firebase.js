import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyB-v9xyg6-0AU3l1O2kfIuubEV8Q1KRqs4",
    authDomain: "chatapp-6ded2.firebaseapp.com",
    projectId: "chatapp-6ded2",
    storageBucket: "chatapp-6ded2.appspot.com",
    messagingSenderId: "841795007168",
    appId: "1:841795007168:web:f3f92d2704b25f9e16b325",
    measurementId: "G-RXSPH8Q7D0"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage();


async function postImage (file) {
    const imgRef = ref(storage, 'images/' + file.name);
    const uploadedImg = await uploadBytes(imgRef, file)
    const url = await getDownloadURL(uploadedImg.ref)
    return url
}


export {
    postImage
}