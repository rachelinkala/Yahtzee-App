import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { NativeRouter, Route, Switch } from 'react-router-native';
import { initMiddleware } from 'devise-axios';
import { Provider } from 'react-redux';
import store from './store';
import FetchUser from './components/FetchUser';
import Auth from './components/Auth';
import Yahtzee from './components/Yahtzee';
import ProtectedRoute from './ProtectedRoute';

class App extends React.Component {
  constructor(props) {
    super(props)
    initMiddleware({ storage: AsyncStorage })
    this.state = { isReady: false }
  }

  getReady = () => {
    return new Promise(resolve => setTimeout(() => resolve("Done"), 3000))
  }

  render() {
    if (!this.state.isReady)
      return (
        <AppLoading
          startAsync={this.getReady}
          onFinish={ () => this.setState({ isReady: true }) }
          onError={console.warn}
        />
      )
      return (
        <Provider store={store}>
          <FetchUser>
            <NativeRouter>
              <Switch>
                <Route exact path="/login" render={ props => <Auth {...props} type="Login" /> } />
                <Route exact path="/register" render={ props => <Auth {...props} type="Register" /> } />
                <ProtectedRoute exact path="/" component={Yahtzee} />
              </Switch>
            </NativeRouter>
          </FetchUser>
        </Provider>
      );
  }
}

export default App;
