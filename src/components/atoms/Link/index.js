import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../utils/colors'

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
        color: colors.text.secondary,
        fontFamily: 'Nunito-Reguler',
        textDecorationLine: 'underline',
        textAlign: align
    })
})
