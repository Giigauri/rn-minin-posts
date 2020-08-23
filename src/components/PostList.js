import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data = [], onOpen }) => {
    if (!data.length === 0) {
        return (
            <View>
                <Text style={styles.noItems}>Post not found in DataBase</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList 
                data={data} 
                keyExtractor={post => post.id.toString()} 
                renderItem={({item}) => <Post post={item} onOpen={onOpen} />} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    }
})