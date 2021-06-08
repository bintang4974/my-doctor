import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ILHospitalsBG } from '../../assets';
import { ListHospital } from '../../components';
import { Fire } from '../../config';
import { colors, fonts } from '../../utils';

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        getHospitals();
    }, []);

    const getHospitals = () => {
        Fire.database()
            .ref('hospitals/')
            .once('value')
            .then((res) => {
                console.log('data: ', res.val());
                if (res.val()) {
                    setHospitals(res.val());
                }
            }).catch((err) => {
                showError(err.message);
            })
    }

    return (
        <View style={styles.page}>
            <ImageBackground source={ILHospitalsBG} style={styles.background}>
                <Text style={styles.title}>RSI Surabaya</Text>
                <Text style={styles.desc}>54 tersedia</Text>
            </ImageBackground>
            <View style={styles.content}>
                {hospitals.map((item) => {
                    return (
                        <ListHospital
                            key={item.id}
                            name={item.title}
                            address={item.address}
                            pic={{uri: item.image}} />
                    )
                })}
            </View>
        </View>
    )
}

export default Hospitals

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1
    },
    background: {
        height: 240,
        paddingTop: 30
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.white,
        textAlign: 'center'
    },
    desc: {
        fontSize: 14,
        fontFamily: fonts.primary[300],
        color: colors.white,
        marginTop: 6,
        textAlign: 'center'
    },
    content: {
        backgroundColor: colors.white,
        borderRadius: 20,
        flex: 1,
        marginTop: -30,
        paddingTop: 14
    }
})
