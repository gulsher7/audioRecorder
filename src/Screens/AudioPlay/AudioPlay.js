import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
//3rd party packages
import { Audio } from 'expo-av';
import LinearGradient from 'react-native-linear-gradient';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const AudioPlay = ({ navigation, route }) => {
    const { data } = route.params
    const [constTime, setConstTime] = useState(data?.time)
    const [isPlaying, setPlaying] = useState(false);
    const [sound, setSound] = useState(null)



    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(
            { uri: data.uri },
            { shouldPlay: false }.uri
        );
        setSound(sound);
        setPlaying(true)
        console.log('Playing Sound');
        await sound.playAsync();
    }

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
            key={isPlaying}
                isPlaying={isPlaying}
                duration={constTime}
                colors={[
                    ['#F91561', 0.5],
                    ['#F9195F', 0.3],
                    ['#FADD0B', 0.2],
                ]}
                onComplete={()=>setPlaying(false)}
            >
                {({ remainingTime, elapsedTime }) => (
                    <Pressable
                        onPress={playAudio}
                    >

                        <LinearGradient
                            colors={['#F9195F', '#FADD0B']}
                            style={styles.linearGradient}>
                            <Animated.Text style={styles.textStyle}>
                                {remainingTime}
                            </Animated.Text>
                            <Text style={styles.secsStyle}>secs left</Text>
                        </LinearGradient>
                    </Pressable>
                )}
            </CountdownCircleTimer>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        width: 170,
        height: 170,
        borderRadius: 170 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 40,
        color: 'white'
    },
    secsStyle: {
        fontSize: 18,
        color: 'white',
        opacity: 0.7
    }
});
export default AudioPlay;
