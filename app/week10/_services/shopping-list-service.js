import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../_utils/firebase";

export const getItems = async (userId) => {
  const itemsCollection = collection(db, `users/${userId}/items`);
  const querySnapshot = await getDocs(itemsCollection);
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

export const addItem = async (userId, newItem) => {
  const itemsCollection = collection(db, `users/${userId}/items`);
  const docRef = await addDoc(itemsCollection, newItem);
  return docRef.id;
};
