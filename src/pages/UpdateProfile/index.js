import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { Fire } from '../../config';
import { colors, getData, showError, storeData } from '../../utils';

const UpdateProfile = ({ navigation }) => {
    const [profile, setProfile] = useState({
        fullName: '',
        profession: '',
        email: '',
        photo: ILNullPhoto,
    });
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(ILNullPhoto);
    const [photoForDB, setPhotoForDB] = useState('');

    useEffect(() => {
        getData('user').then((res) => {
            const data = res;
            setPhoto({ uri: res.photo });
            setProfile(data);
        });
    }, []);

    const update = () => {
        console.log('profile', profile);


        console.log('new Password: ', password);

        if (password.length > 0) {
            if (password.length < 6) {
                showError('Password kurang dari 6 karakter');
            } else {
                // update password
                updatePassword();
                updateProfileData();
                navigation.replace('MainApp');
            };
        } else {
            updateProfileData();
            navigation.replace('MainApp');
        }

    };

    const updatePassword = () => {
        Fire.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updatePassword(password).catch((err) => {
                    showError(err.message);
                });
            };
        });
    }

    const updateProfileData = () => {
        const data = profile;
        data.photo = photoForDB;

        Fire.database()
            .ref(`users/${profile.uid}/`)
            .update(data)
            .then(() => {
                console.log('success: ', data);
                storeData('user', data);
            })
            .catch((err) => {
                console.log('error: ', err);
                showError(err.message);
            });
    }

    const changeText = (key, value) => {
        setProfile({
            ...profile,
            [key]: value,
        });
    };

    const getImage = () => {
        let options = {
            quality: 0.5,
            maxWidth: 200,
            maxHeight: 200,
            storageOption: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            console.log('response:', response);
            if (response.didCancel || response.error) {
                showError('oops, sepertinya anda tidak memilih foto!');
            } else {
                console.log('response getImage: ', response);
                setPhotoForDB(`data:${response.type};base64, ${response.base64}`);

                const source = { uri: response.uri };
                setPhoto(source);
            };
        });
    };

    return (
        <View style={styles.page}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile isRemove photo={photo} onPress={getImage} />
                    <Gap height={26} />
                    <Input
                        label="Full Name"
                        value={profile.fullName}
                        onChangeText={(value) => changeText('fullName', value)}
                    />
                    <Gap height={24} />
                    <Input
                        label="Pekerjaan"
                        value={profile.profession}
                        onChangeText={(value) => changeText('profession', value)}
                    />
                    <Gap height={24} />
                    <Input
                        label="Email"
                        value={profile.email}
                        disable
                    />
                    <Gap height={24} />
                    <Input
                        label="Password"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry
                    />
                    <Gap height={40} />
                    <Button title="Save Profile" onPress={update} />
                </View>
            </ScrollView>
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    content: {
        padding: 40,
        paddingTop: 0
    }
})
