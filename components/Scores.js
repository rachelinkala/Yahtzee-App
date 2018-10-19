import React from 'react';
import axios from 'axios';
import { View, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { BASE_URL } from '../utils/urls';

const styles = {
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  header: {
    fontSize: 50,
  },
  scoreRow: {
    flex: 1,
    justifyContent: "space-around",
    alignSelf: "stretch",
    marginTop: 5,
    backgroundColor: "aliceblue",
    height: 40,
    paddingLeft: 25,
    paddingRight: 25,
  }
}

class Scores extends React.Component {
  state = {scores: []}

  componentDidMount() {
    axios.get(`${BASE_URL}/api/scores`)
      .then(res => {
        this.setState({ scores: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  displayScores = () => {
    const { scores } = this.state;
    return scores.map( s => {
      return(
        <View key={s.id} style={styles.scoreRow}>
          <Text>{s.value} - {s.email}</Text>
        </View>
      )
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Link to="/">
          <Text>Back</Text>
        </Link>
        <Text style={styles.header}>Scores</Text>
        <ScrollView>
          { this.displayScores() }
        </ScrollView>
      </View>
    )
  }
}

export default Scores;
