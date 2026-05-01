import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Dummy data for premium look
const INITIAL_POSTS = [
  { id: '1', user: 'Hashir', handle: '@hashir_dev', avatar: 'https://i.pravatar.cc/150?img=11', content: 'Just launched my new app using React Native! 🚀 The animations are buttery smooth.', likes: 120, comments: 14, time: '2h ago' },
  { id: '2', user: 'Alex', handle: '@alex_designs', avatar: 'https://i.pravatar.cc/150?img=32', content: 'Exploring deep learning algorithms today. Python is amazing.', likes: 304, comments: 22, time: '5h ago', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const renderItem = ({ item }: any) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.userHandle}>{item.handle} • {item.time}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#888" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      
      <View style={styles.interactionBar}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="heart-outline" size={24} color="#888" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={22} color="#888" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.logoText}>SocialConnect</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <View style={styles.addBtn}>
            <Ionicons name="add" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  appBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  logoText: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  addBtn: { backgroundColor: '#4facfe', borderRadius: 20, padding: 5 },
  feed: { padding: 15 },
  postCard: { backgroundColor: '#1a1a24', borderRadius: 20, padding: 15, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  headerText: { flex: 1 },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  userHandle: { color: '#888', fontSize: 13, marginTop: 2 },
  postContent: { color: '#e0e0e0', fontSize: 16, lineHeight: 24, marginBottom: 15 },
  postImage: { width: '100%', height: 200, borderRadius: 15, marginBottom: 15 },
  interactionBar: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#2a2a36', paddingTop: 15 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 30 },
  actionText: { color: '#888', marginLeft: 8, fontSize: 15, fontWeight: '500' }
});
