import { auth, firestore } from './firebase';

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    await firestore().collection('Users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: '',
      bio: '',
      followers: [],
      following: [],
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return await auth().signOut();
};
