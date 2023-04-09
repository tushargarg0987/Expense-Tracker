import { Ionicons } from "@expo/vector-icons";
import { Pressable, View,StyleSheet } from "react-native";

function IconButton({icon,size,color,onPress,round}) { 
    return (
        <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
            <View style={[styles.buttonContainer, !round && styles.margin]}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 0,
        marginHorizontal: 3,
        marginVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4,
        paddingTop: 1
    },
    margin: {
        marginHorizontal: 10,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
})