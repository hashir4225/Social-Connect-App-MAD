import { firestore } from './firebase';

export const sendMessage = async (senderId, receiverId, text) => {
  return await firestore().collection('Messages').add({
    participants: [senderId, receiverId],
    senderId,
    receiverId,
    text,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const getMessagesStream = (currentUserId, otherUserId, onUpdate) => {
  return firestore().collection('Messages')
    .where('participants', 'array-contains', currentUserId)
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(msg => msg.participants.includes(otherUserId));
      
      onUpdate(messages);
    });
};
