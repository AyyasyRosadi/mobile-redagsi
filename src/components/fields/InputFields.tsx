import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { TInputField } from './TypeFields'

const InputField = ({color,defaultVal,keyboard,placeholder,readOnly,value,secure,set,title}:TInputField) => {
    return (
        <View className="mb-3">
            <Text className="ml-[2px] mb-[6px]">{title}</Text>
            <TextInput
                defaultValue={defaultVal}
                placeholder={placeholder}
                secureTextEntry={secure}
                className={`${color} py-2  border-b border-b-slate-400 shadow-lg text-slate-800 rounded-md`}
                onChangeText={set}
                value={value}
                editable={readOnly}
                keyboardType={keyboard}

            />
        </View>
    )
}

export default InputField