import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DummyHospital } from '../../../assets';
import { colors, fonts } from '../../../utils';

const ListHospital = () => {
    return (
        <View style={styles.container}>
            <Image source={DummyHospital} style={styles.picture} />
            <View>
                <Text style={styles.title}>Rumah Sakit</Text>
                <Text style={styles.title}>Islam Surabaya</Text>
                <Text style={styles.address}>JL. Ayani Surabaya</Text>
            </View>
        </View>
    )
}

export default ListHospital

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: colors.border
    },
    picture: {
        width: 80,
        height: 60,
        borderRadius: 11,
        marginRight: 16
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary
    },
    address: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary,
        marginTop: 6
    }
})
