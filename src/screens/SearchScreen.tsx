import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_RESULTS = [
  { id: '1', name: 'Alex Designs', handle: '@alex_designs', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: '2', name: 'Jane Doe', handle: '@jane_doe', avatar: 'https://i.pravatar.cc/150?img=47' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.userCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userHandle}>{item.handle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users or posts..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>
      
      {query.length > 0 ? (
        <FlatList
          data={DUMMY_RESULTS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color="#333" />
          <Text style={styles.emptyText}>Find your friends and topics</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  header: { padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#222' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a24', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16 },
  resultsList: { padding: 15 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a24', padding: 15, borderRadius: 12, marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  userHandle: { color: '#888', fontSize: 14, marginTop: 2 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#555', fontSize: 16, marginTop: 15 }
});
