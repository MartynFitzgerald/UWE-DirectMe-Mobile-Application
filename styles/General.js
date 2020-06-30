/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  colourSchemes.js  
|  Description:  This is the file that holds all the colours for each schemes. 
|                the best car park location.
|                
*===========================================================================*/
import { StyleSheet} from 'react-native';

export const button = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  borderColor: '#000000',
  height:50,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width:250,
};

export const styles = StyleSheet.create({
  mapSearchBox: {
    width: '85%',
    marginTop: -1,
    height: 55,
    borderRadius: 0,
  },
  searchButton: {
    backgroundColor: '#bec6cf',
    width: '15%',
    marginLeft: '85%',
    height: 55,
    position: 'absolute',
  },
  searchButtonText: {
    color: '#007aff', // #86939e
  },
  header:{
    backgroundColor: "#4285F4",
    padding:15,
    alignItems: 'center',
  },
  name:{
    textAlign: 'center', 
    fontSize:22,
    color:"#fff",
    fontWeight:'bold',
  },
  userInfo:{
    textAlign: 'center', 
    width:'100%',
    fontSize:14,
    color:"#fff",
  },
  redText:{
    color:"#ff0000",
  },
  emptyResult: {
    padding: 10,
    textAlignVertical: 'center',
    textAlign: 'center', 
  },
  outerBox: {
    padding: 0,
    margin: 0,
  },
  searchBox: {
    width: "100%",
    marginTop: -1,
    height: 55,
    borderRadius: 0,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom:10,
  },
  alertBox:{
    backgroundColor: "#ffffff",
    padding:10,
    alignItems: 'center',
  },
  directionBox:{
    backgroundColor: "#ffffff",
    padding:5,
    alignItems: 'center',
  },
  paid: {
    textAlignVertical: 'center',
    textAlign: 'center', 
    paddingHorizontal: 10,
    borderRadius:10,
    maxHeight:30, 
    top:12.5,
    backgroundColor: '#2FD63C',
    fontWeight: 'bold',
  },
  unpaid: {
    textAlignVertical: 'center',
    textAlign: 'center', 
    paddingHorizontal: 10,
    borderRadius:10,
    maxHeight:30, 
    top:12.5,
    backgroundColor: '#E71212',
    fontWeight: 'bold',
  },
  appBar: {
      backgroundColor: '#EB3349',
  },
  appBarTitle: {
    alignItems: 'center',
    fontFamily: 'Pacifico',
    fontSize: 30,
  },
  list: {
    width: '100%',
    height: '100%',
  },
  informationText: {
      textAlign: 'justify', 
      margin: 15,
  },
  logoInformation: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 15,
  },
  emailText: {
    textAlignVertical: 'center',
    color: '#0000EE',
    textDecorationLine: 'underline'
  },
  viewOverall:{
    minHeight:700,
    maxHeight:700,
  },
  viewOverallText:{
    alignItems: 'center',
  },
  map: {
      flex: 1,
      marginTop: -15,
      minWidth:372,
      maxWidth:372,
      minHeight:300,
      maxHeight:300,
  },
  centerVerticalText: {
    textAlignVertical: 'center',
  },

  facebookColor: {
    backgroundColor: "#3b5998"
  },
  googleColor: {
    backgroundColor: "#FFFFFF"
  },
  loginText: {
    marginLeft: 5,
    color: 'white'
  },
  googleText: {
    marginLeft: 5,
    color: '#B2B2B2'
  },
  restoreButtonContainer:{
    width:250,
    marginLeft:30,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  LinearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  inputContainerAccount: {
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    width:300,
    height:50,
    marginTop:15,
    marginBottom:15,
    flexDirection: 'row',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width:300,
    height:50,
    marginBottom:15,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    borderBottomColor: '#FFFFFF',
    textAlign: 'center',
    flex:1
  },
  icon:{
    width:30,
    height:30
  },
  buttonContainerMetadata: {
    ...button,
    marginTop:10,
    marginBottom:10,
    backgroundColor: '#FFFFFF',
    borderWidth: .5,
    borderRadius:30,
  },
  smallButtonContainer: {
    ...button,
    margin:10,
    width:150,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: .5,
    borderRadius:30,
  },
  buttonContainer: {
    ...button,
    marginBottom:20,
    backgroundColor: '#FFFFFF',
    borderWidth: .5,
    borderRadius:30,
  },
  buttonContainerSocialAccount: {
    ...button,
    elevation: 5,
    marginBottom:20,
  },
  logo:{
    margin:50,
    width:369,
    height:82
  },
});