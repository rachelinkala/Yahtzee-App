import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { logout } from '../reducers/user';

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#77DD77",
    flexDirection: "column",
  },
  buttonText: {
    height: 50,
    width: 300,
    textAlign:"center",
    fontSize: 40,
    backgroundColor: "gray",
    color:"white",
    marginTop: 20,
    alignSelf:"center",
  },
}

const Yahtzee = ({ history, dispatch }) => (
  <View style={styles.container}>
    <Link to="/game">
      <Text style={styles.buttonText}>New Game</Text>
    </Link>
    <Link to="/scores">
      <Text style={styles.buttonText}>Scores</Text>
    </Link>
    <TouchableOpacity onPress={ () => dispatch(logout(history)) }>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  </View>
)

export default connect()(Yahtzee);
