import { Ionicons } from "@expo/vector-icons";
import { Pressable, View,StyleSheet } from "react-native";

function IconButton({icon,size,color,onPress}) { 
    return (
        <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
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
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
})