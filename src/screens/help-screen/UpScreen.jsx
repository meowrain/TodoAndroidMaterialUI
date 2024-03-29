import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Divider, useTheme} from "react-native-paper";
import {ThemeContext} from "../../stores/themeContext";


export default function UpScreen() {
    const {isDarkModeOn} = useContext(ThemeContext)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,

        },
        title: {
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 20,
            color: isDarkModeOn ? 'white' : 'black'
        },
        step: {
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            color: isDarkModeOn ? 'white' : 'black'
        },
        note: {
            fontSize: 15,
            fontStyle: 'italic',
            marginTop: 120,
            flex: 1,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: isDarkModeOn ? 'white' : 'black'
        },
        button: {
            width: 100,
            height: 40,
            borderRadius: 30,
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 200,
        },
        buttonText: {
            color: 'black',
            fontSize: 16,
        },
        buttonClicked: {
            backgroundColor: 'blue',
        },
    });

    const {colors} = useTheme();

    const [helpfulClicked, setHelpfulClicked] = useState(false);
    const [notHelpfulClicked, setNotHelpfulClicked] = useState(false);

    const handleHelpfulClick = () => {
        setHelpfulClicked(true);

        // 调用一个函数来记录用户反馈
        recordFeedback(true);
    };

    const handleNotHelpfulClick = () => {
        setNotHelpfulClicked(true);

        // 调用一个函数来记录用户反馈
        recordFeedback(false);
    };

    const recordFeedback = (helpful, feedbackText) => {
        // 可以在这里将用户的反馈信息发送到后端进行记录
        // 也可以将反馈信息保存在本地或数据库中
        console.log("用户反馈：", helpful ? "有帮助" : "没帮助", feedbackText);
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={styles.title}>如何顶置行程？</Text>
            <Divider/>
            <Text style={styles.step}>1. 长按你想要顶置的行程</Text>
            <Text style={styles.step}>2. 在弹出的悬浮框中点击确定</Text>
            <Text style={styles.step}>3. 这样就可以在页面顶部看到你的顶置行程</Text>
            <Divider/>
            <Text style={styles.note}>以上内容是否对你有帮助？</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <TouchableOpacity
                    style={[styles.button, helpfulClicked && styles.buttonClicked]}
                    onPress={handleHelpfulClick}
                    disabled={helpfulClicked || notHelpfulClicked}
                >
                    <Text style={[styles.buttonText,]}>有帮助</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, notHelpfulClicked && styles.buttonClicked]}
                    onPress={handleNotHelpfulClick}
                    disabled={helpfulClicked || notHelpfulClicked}
                >
                    <Text style={[styles.buttonText,]}>没帮助</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


