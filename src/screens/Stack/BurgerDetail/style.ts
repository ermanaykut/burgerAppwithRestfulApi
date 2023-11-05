import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';

const {width}= Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  image: {
    width: '100%',
    height: 225,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.tortilla + 85,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.darkgrey,
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  titleIngridients: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.tortilla + 85,
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  flatContainer:{
    height:260,
    alignSelf:'center'
  },

  IngridientSubContainer:{
    paddingHorizontal:15,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 5,
    width: width*.28,
    height: width*.28, 
  },
  ingridientText:{
    fontSize:14,
    color:colors.tortilla,
    fontWeight:'500',
  },
  ingridientImg:{
    width:80,
    height:80
  },
  extra:{
    width:'50%',
    marginTop:15,
    marginHorizontal:15,
    borderWidth:1,
    borderColor: colors.tortilla + 80,
    backgroundColor: colors.border,
    shadowOpacity:0.7,
    shadowColor: colors.tortilla,
    paddingVertical:15,
    borderRadius:8,
    alignItems:'center',
    alignSelf:'center'
  },
  actionButtonText:{
    fontSize:18,
    color: colors.tortilla,
    fontWeight:'600'
  },
  priceContainer: {
    width: '100%',
    height: 60,
    backgroundColor: colors.tortilla,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '30%',
    marginLeft:10,
  },
  iconContainer:{
    backgroundColor:colors.white,
    borderRadius:100,
  },
  disabledIconContainer:{
    backgroundColor:colors.white +80,
  },
  countText:{
    fontSize:22,
    fontWeight:'600',
  },
  subPriceContainer:{
    marginHorizontal:30,
    justifyContent:'center'
  },
  totalPrice:{
    fontSize:22,
    fontWeight:'600'
  },
  addToCartContainer:{
    marginHorizontal:17,
    backgroundColor:colors.border,
    shadowOpacity:1,
    shadowColor: colors.black + 95,
    borderRadius:6,

  },
  addToCartText:{
    fontSize:20,
    fontWeight:'600',
    color:colors.tortilla,
    paddingHorizontal:5,
    paddingVertical:5,

  },
  actionSheetContainer:{
    height:370,
    paddingHorizontal:20,
    paddingVertical:10

  },
  actionTitle:{
    alignSelf:'center',
    color: colors.tortilla,
    fontSize:22,
    marginBottom:15
  },
});

export default styles;
