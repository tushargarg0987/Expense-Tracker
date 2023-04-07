import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../../constants/style";

function Input({ label, textInputConfig, style,invalid }) {
    
    const inputStyles = [styles.textInput]
    
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.multiLineInput)
    }

    if (!invalid) {
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, !invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    textInput: {
        color: GlobalStyles.colors.primary700,
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    multiLineInput: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})