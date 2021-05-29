import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ILNullPhoto } from '../../assets';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { colors, getData, storeData } from '../../utils';
import { Fire } from '../../config';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';

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
                showMessage({
                    message: err.message,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                });
            });
    };

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
                showMessage({
                    message: 'oops, sepertinya anda tidak memilih foto!',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                });
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
