import { firestore } from './firebase';

export const followUser = async (currentUserId, targetUserId) => {
  const batch = firestore().batch();
  
  const currentUserRef = firestore().collection('Users').doc(currentUserId);
  const targetUserRef = firestore().collection('Users').doc(targetUserId);

  batch.update(currentUserRef, {
    following: firestore.FieldValue.arrayUnion(targetUserId)
  });
  
  batch.update(targetUserRef, {
    followers: firestore.FieldValue.arrayUnion(currentUserId)
  });

  return await batch.commit();
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  const batch = firestore().batch();
  
  const currentUserRef = firestore().collection('Users').doc(currentUserId);
  const targetUserRef = firestore().collection('Users').doc(targetUserId);

  batch.update(currentUserRef, {
    following: firestore.FieldValue.arrayRemove(targetUserId)
  });
  
  batch.update(targetUserRef, {
    followers: firestore.FieldValue.arrayRemove(currentUserId)
  });

  return await batch.commit();
};

export const searchUsers = async (searchTerm) => {
  const snapshot = await firestore()
    .collection('Users')
    .where('displayName', '>=', searchTerm)
    .where('displayName', '<=', searchTerm + '\uf8ff')
    .get();
    
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
