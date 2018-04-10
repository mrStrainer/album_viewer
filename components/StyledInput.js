import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { withRouter } from 'react-router'

const Styles = StyleSheet.create({
  Input: {
    width: '95%',
    height: 33,
    borderWidth: 2,
    borderColor: "#3d3d3d",
    borderRadius: 4,
    borderStyle: "solid",
    textAlign: "center",
    marginBottom:5,
    color:'#ccc'
  }
});

const StyledInput = ({ placeholder = '', phColor = '#9c9c9c', onChangeText, onSubmitEditing }) => {
    return  (
        <TextInput
            style={Styles.Input} 
            placeholder={placeholder} 
            placeholderTextColor={phColor}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
        />
    )
}

export default withRouter(StyledInput);
