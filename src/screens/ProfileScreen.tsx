import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Hashir',
    handle: '@hashir_dev',
    bio: 'Software Engineer & Designer. Building premium apps with React Native.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    postsCount: 42,
    followers: 1200,
    following: 300
  });

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
        if (response.assets && response.assets.length > 0) {
            setProfileData({...profileData, avatar: response.assets[0].uri || profileData.avatar});
        }
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editBtn}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={isEditing ? handlePickImage : undefined} style={styles.avatarContainer}>
          <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
          {isEditing && (
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        {isEditing ? (
          <>
            <TextInput 
              style={styles.inputName} 
              value={profileData.name} 
              onChangeText={t => setProfileData({...profileData, name: t})}
            />
             <TextInput 
              style={styles.inputBio} 
              multiline
              value={profileData.bio} 
              onChangeText={t => setProfileData({...profileData, bio: t})}
            />
          </>
        ) : (
          <>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.handle}>{profileData.handle}</Text>
            <Text style={styles.bio}>{profileData.bio}</Text>
          </>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profileData.postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profileData.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profileData.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {!isEditing && (
            <View style={styles.actionButtons}>
               <TouchableOpacity style={styles.actionBtn}>
                   <Text style={styles.actionBtnText}>Follow</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.actionBtnSecondary}>
                   <Text style={styles.actionBtnSecondaryText}>Message</Text>
               </TouchableOpacity>
            </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  editBtn: { color: '#00f2fe', fontSize: 16 },
  profileSection: { alignItems: 'center', padding: 20 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#00f2fe' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#00f2fe', borderRadius: 15, padding: 5 },
  name: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  handle: { color: '#888', fontSize: 14, marginBottom: 15 },
  bio: { color: '#ccc', textAlign: 'center', paddingHorizontal: 20, lineHeight: 22, marginBottom: 25 },
  inputName: { color: '#fff', fontSize: 24, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 10, textAlign: 'center' },
  inputBio: { color: '#ccc', textAlign: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 25 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderTopWidth: 1, borderTopColor: '#222', borderBottomWidth: 1, borderBottomColor: '#222', paddingVertical: 20 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12, marginTop: 4 },
  actionButtons: { flexDirection: 'row', marginTop: 25, width: '100%', justifyContent: 'center' },
  actionBtn: { backgroundColor: '#00f2fe', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, marginRight: 15 },
  actionBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  actionBtnSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#00f2fe', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  actionBtnSecondaryText: { color: '#00f2fe', fontWeight: 'bold', fontSize: 16 }
});
