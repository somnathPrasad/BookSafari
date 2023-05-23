import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { firestore } from "../../../lib";
import { COLLECTION } from "../../../constants";

export const createUser = async (
  userCredentials: FirebaseAuthTypes.UserCredential
) => {
  const { user } = userCredentials;
  const { uid, email, displayName, photoURL } = user;

  const userData = {
    email,
    displayName,
    photoURL,
  };

  try {
    // Creating a profile for the new user
    await firestore.collection(COLLECTION.USERS).doc(uid).set(userData);
    // Creating a bookshelf for the new user
    await firestore
      .collection(COLLECTION.BOOKSHELF)
      .doc(uid)
      .set({ books: [] });
  } catch (error) {
    console.log(error);
  }

  return userData;
};
