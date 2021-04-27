import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

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
        fontFamily: fonts.primary[400],
        textDecorationLine: 'underline',
        textAlign: align
    })
})
