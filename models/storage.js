exports.setStorage  = async function() {
  await AsyncStorage.setItem('@DirectMe:user', JSON.stringify(this.state.user));
}