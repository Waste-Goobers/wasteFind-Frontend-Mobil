import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function VideoInput() {
    return (
        <View>
            <TouchableOpacity style={styles.buttonAnalyzeWaste} onPress={() => navigation.navigate('Sign In')}>
                <Text style={styles.buttonAnalyzeWasteText}>Analyze Waste</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonAnalyzeWaste: {
        width: 200,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#e6e0cd',
        backgroundColor: '#4ecdc4',
        padding: 5,
        marginTop: '50%'
    },
    buttonAnalyzeWasteText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
})
