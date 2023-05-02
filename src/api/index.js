import { getIdTokenResult, signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

import { auth, firestore, storage } from "../config/firebase";

export const getUser = async () => {
  const { currentUser } = auth;
  if (!currentUser) {
    return "Error";
  }
  const token = await getIdTokenResult(currentUser);
  return {
    user: { uid: currentUser.uid, email: currentUser.email },
    token: token.token,
  };
};

export const logIn = async (userData) => {
  const createdUser = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  return createdUser.user;
};

export const logOut = async () => {
  await auth.signOut();
  return auth.currentUser;
};

export const getNews = async () => {
  const docs = (await getDocs(collection(firestore, "News"))).docs;
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createNew = async (data, file, onAddNew) => {
  const storageRef = ref(storage, `files/${file.name}`);
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (downloadURL) => {
          const createdData = await addDoc(collection(firestore, "News"), {
            preview: downloadURL,
            ...data,
          });
          const findedNew = doc(firestore, "News", createdData.id);
          const converted = (await getDoc(findedNew)).data();
          onAddNew(converted);
          alert("CREATED");
        })
        .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
};

export const getGallery = async () => {
  const listRef = ref(storage, `files`);
  const { items } = await listAll(listRef);
  const result = items.map(async (it) => await getDownloadURL(it));
  return await Promise.all(result).then((res) => res);
};

export const updateNewById = async (newId, data, file, onSuccess) => {
  const newWithId = doc(firestore, "News", newId);

  if (file) {
    const storageRef = ref(storage, `files/${file.name}`);
    return uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (downloadURL) => {
            await updateDoc(newWithId, { preview: downloadURL, ...data });
            onSuccess(newId, { ...data, preview: downloadURL });
            alert("UPDATED");
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
  }

  alert("UPDATED");
  onSuccess(newId, { ...data });
  return await updateDoc(newWithId, data);
};

export const getNewById = async (newId) => {
  const newWithId = doc(firestore, "News", newId);
  return (await getDoc(newWithId)).data();
};

export const uploadImage = async (file, onSuccess) => {
  const storageRef = ref(storage, `files/${file.name}`);
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (downloadURL) => {
          onSuccess(downloadURL);
          alert("UPLOADED");
        })
        .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
};

export const deleteNewById = async (newId) => {
  const newWithId = doc(firestore, "News", newId);
  return await deleteDoc(newWithId);
};

export const deleteImageFromGallery = async (url, onSuccess) => {
  const desertRef = ref(storage, url);
  // Delete the file
  try {
    const data = await deleteObject(desertRef);
    onSuccess(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
