import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Link = ({ title, size, align }) => {
    return (
        <View>
            <Text style={styles.link(size, align)}>{title}</Text>
        </View>
    )
}

export default Link

const styles = StyleSheet.create({
    link: (size, align) => ({
        fontSize: size,
        color: '#7D8797',
        fontFamily: 'Nunito-Reguler',
        textDecorationLine: 'underline',
        textAlign: align
    })
})
