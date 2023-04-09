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
        color: 'black',
        marginBottom: 4,
        marginLeft: 4,
    },
    textInput: {
        color: '#3d3f45',
        backgroundColor: 'rgba(46,103,248,0.15)',
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black'
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