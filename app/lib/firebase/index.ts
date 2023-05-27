import firebaseFirestore from "@react-native-firebase/firestore";
import firebaseAuth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { COLLECTION } from "../../constants";
import { BookType } from "../types";
import Toast from "react-native-root-toast";

export const firestore = firebaseFirestore();
export const auth = firebaseAuth();

const firebase = {
  signIn: async (userCredentials: FirebaseAuthTypes.AuthCredential) => {
    try {
      const userData = await auth.signInWithCredential(userCredentials);
      if (userData?.additionalUserInfo?.isNewUser) {
        const { uid, email, displayName, photoURL } = userData.user;
        await firestore
          .collection(COLLECTION.USERS)
          .doc(uid)
          .set({ email, displayName, photoURL });
        await firestore
          .collection(COLLECTION.BOOKSHELF)
          .doc(uid)
          .set({ books: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },
  signOut: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  },
  removeBookFromBookshelf: async (book: BookType | null) => {
    if (book === null) return;
    const path = `${COLLECTION.BOOKSHELF}/${auth.currentUser?.uid}`;
    try {
      await firestore.doc(path).update({
        books: firebaseFirestore.FieldValue.arrayRemove(book),
      });
      Toast.show("Book removed from your bookshelf");
    } catch (error) {
      console.log(error);
      Toast.show("Failed to remove book from bookshelf");
    }
  },
  addBookToBookshelf: async (book: BookType | null) => {
    if (book === null) return;
    const path = `${COLLECTION.BOOKSHELF}/${auth.currentUser?.uid}`;
    try {
      await firestore.doc(path).update({
        books: firebaseFirestore.FieldValue.arrayUnion(book),
      });
      Toast.show("Book added to your bookshelf");
    } catch (error) {
      console.log(error);
      Toast.show("Failed to add book to bookshelf");
    }
  },
  getUserProfile: async () => {
    const path = `${COLLECTION.USERS}/${auth.currentUser?.uid}`;
    try {
      const user = await firestore.doc(path).get();
      return user.data();
    } catch (error) {
      console.log(error);
    }
  },
  markBookAsRead: async (book: BookType | null) => {
    if(book === null) return;
    const path = `${COLLECTION.BOOKSHELF}/${auth.currentUser?.uid}`;
    try {
      await firestore.doc(path).update({
        books: firebaseFirestore.FieldValue.arrayRemove(book),
      });
      await firestore.doc(path).update({
        books: firebaseFirestore.FieldValue.arrayUnion({
          ...book,
          read: true,
        }),
      });
      Toast.show("Book marked as read");
    } catch (error) {
      console.log(error);
      Toast.show("Failed to mark book as read");
    }
  }
};

export default firebase;
