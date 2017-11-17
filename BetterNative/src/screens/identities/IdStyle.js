import { StyleSheet } from 'react-native';

const IdStyle = StyleSheet.create({
    content: {
      flex: 0.7,
      flexDirection:'column',
      justifyContent: 'center'
    },
    label: {
      flex: 0.3,
      alignItems: 'center'
    },
    icon: {
      fontSize: 65
    },
    approved: {
      color:'green'
    },
    approvedIcon: {
      fontSize: 15
    }
});

export default IdStyle;