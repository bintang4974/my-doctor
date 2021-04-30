import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { DummyHospital, DummyHospital2, DummyHospital3, ILHospitalsBG } from '../../assets';
import { ListHospital } from '../../components';
import { colors, fonts } from '../../utils';

const Hospitals = () => {
    return (
        <View style={styles.page}>
            <ImageBackground source={ILHospitalsBG} style={styles.background}>
                <Text style={styles.title}>RSI Surabaya</Text>
                <Text style={styles.desc}>54 tersedia</Text>
            </ImageBackground>
            <View style={styles.content}>
                <ListHospital type="Rumah Sakit" name="RSI Surabaya" address="JL. Ayani Surabaya" pic={DummyHospital} />
                <ListHospital type="Rumah Sakit Anak" name="Karang Menjangan Surabaya" address="JL. Ayani Surabaya" pic={DummyHospital2} />
                <ListHospital type="Rumah Sakit Jiwa" name="RSAL Surabaya" address="JL. Ayani Surabaya" pic={DummyHospital3} />
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
