import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { signInWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection, getDocs } from "firebase/firestore"

import { auth, firestore, storage } from "../config/firebase"

export const logIn = async (userData) => {
    const createdUser = await signInWithEmailAndPassword(auth, userData.email, userData.password)
    return createdUser.user
}

export const logOut = async () => {
    await auth.signOut()
    return auth.currentUser
}

export const getNews = async () => {
    const docs = (await getDocs(collection(firestore, "News"))).docs
    return docs.map(doc => doc.data())
}

export const createNew = async (data, file) => {
    const storageRef = ref(storage, `files/${file.name}`)
    return uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(firestore, "News"), { preview: downloadURL, ...data })
            alert("CREATED")
        }).catch(err => alert(err.message))
    }).catch(err => alert(err.message))
}