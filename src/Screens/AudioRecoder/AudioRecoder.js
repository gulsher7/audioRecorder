import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
//3rd party packages
import { Audio } from 'expo-av';
import LinearGradient from 'react-native-linear-gradient';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


const AudioRecoder = ({ navigation }) => {
    const [recording, setRecording] = useState();
    const [isPlaying, setPlaying] = useState(false);
    const [consTime, setConstTime] = useState(15)
    const [recordedTime, setRecordedTime] = useState(0)
    const [spinnerKey, setSpinnerKey] = useState(false)

    useEffect(() => {
        const blur = navigation.addListener('blur', async () => {
            if (!!recording) {
                await recordedTime.stopAndUnloadAsync();
            }
            setSpinnerKey(true)
        })
        const focus = navigation.addListener('focus', async () => {
            if (!!recording) {
                await recordedTime.stopAndUnloadAsync();
            }
            setSpinnerKey(true)
        })
        return blur, focus;
    }, [navigation])


    const _onLongPress = async () => {
        try {
            console.log('Requesting permissions..');
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setPlaying(true)
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }
    const _onPressOut = async () => {
        console.log('Stopping recording..');
        setPlaying(false)
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        if (!!uri) {
            navigation.navigate('audioPlay', { data: { uri: uri, time: recordedTime } })
        }
    }



    useEffect(() => {
        (async () => {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
            })
        })();
    }, [])

    const checkTime = (time, elapsedTime) => {
        setRecordedTime(elapsedTime)
        if (!isPlaying && time !== 15 && !!recording || time == 0) {
            if (!!recording) {
                _onPressOut()
            }
        }
    }

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={consTime}
                key={spinnerKey}
                colors={[
                    ['#F91561', 0.5],
                    ['#F9195F', 0.3],
                    ['#FADD0B', 0.2],
                ]}
            >
                {({ remainingTime, elapsedTime }) => (
                    <Pressable
                        onLongPress={_onLongPress}
                        onPressOut={_onPressOut}
                    >
                        {checkTime(remainingTime, elapsedTime)}
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

export default AudioRecoder;
