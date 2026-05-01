import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { createPost } from '../services/posts';

export default function CreatePostScreen({ navigation }: any) {
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  // Hardcoded for demo, normally from Redux/Firebase Auth
  const currentUserId = 'demo-user-id';

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handlePost = async () => {
    if (!content.trim() && !imageUri) return;
    setIsPosting(true);
    try {
      // In a real app we upload image to Firebase Storage first here and get the URL
      // const uploadedImageUrl = await uploadImage(imageUri);
      await createPost(currentUserId, content, imageUri || '');
      navigation.goBack();
    } catch (e) {
      console.log('Error creating post', e);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.postBtn, (!content && !imageUri) && styles.postBtnDisabled]} onPress={handlePost} disabled={isPosting}>
          <Text style={styles.postBtnText}>{isPosting ? 'Posting...' : 'Post'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#888"
        multiline
        autoFocus
        value={content}
        onChangeText={setContent}
      />

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          <TouchableOpacity style={styles.removeImage} onPress={() => setImageUri(null)}>
            <Ionicons name="close-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionIcon} onPress={pickImage}>
          <Ionicons name="image-outline" size={28} color="#00f2fe" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50, alignItems: 'center' },
  postBtn: { backgroundColor: '#00f2fe', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postBtnDisabled: { backgroundColor: '#333' },
  postBtnText: { color: '#000', fontWeight: 'bold' },
  input: { flex: 1, color: '#fff', fontSize: 18, paddingHorizontal: 20, textAlignVertical: 'top' },
  imageContainer: { margin: 20, position: 'relative' },
  previewImage: { width: '100%', height: 300, borderRadius: 15 },
  removeImage: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 15 },
  actionBar: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: '#333' },
  actionIcon: { marginRight: 20 }
});
