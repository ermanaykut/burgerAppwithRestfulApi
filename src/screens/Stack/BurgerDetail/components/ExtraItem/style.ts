import { StyleSheet } from "react-native";
import { colors } from "../../../../../constants/colors";



const styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:8,
        paddingTop:8,
        paddingBottom:2,
        marginBottom:5,
        borderBottomWidth:1,
        borderBlockColor: colors.tortilla

        
    },
    textOne:{
        fontSize:18,
        color: colors.tortilla
    },
    priceContainer:{

        width: '20%'
    },
    textTwo:{
        fontSize:16,
        color: colors.tortilla,
        fontWeight:'600'
    },

})

export default styles