import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const Input = ({label}) => {
    return (
        <View>
            <Text style={styles.title}>{label}</Text>
            <TextInput style={styles.input} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 10,
        padding: 12
    },
    title: {
        fontSize: 16,
        color: '#7D8797',
        fontFamily: 'Nunito-Reguler',
        marginBottom: 6
    }
})
