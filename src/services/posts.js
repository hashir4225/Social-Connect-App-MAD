import { firestore } from './firebase';

export const createPost = async (userId, textContent, imageUrl = '') => {
  return await firestore().collection('Posts').add({
    userId,
    textContent,
    imageUrl,
    likesCount: 0,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const editPost = async (postId, textContent) => {
  return await firestore().collection('Posts').doc(postId).update({
    textContent,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const deletePost = async (postId) => {
  return await firestore().collection('Posts').doc(postId).delete();
};
