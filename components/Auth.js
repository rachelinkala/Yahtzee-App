import React from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import {
  loginUser,
  register,
} from '../reducers/user';

const styles = {
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: "white",
    width: 300,
    fontSize: 20,
  },
  buttonText: {
    backgroundColor: 'blue',
    color: 'white',
    height: 40,
    fontSize: 20,
    lineHeight: 30,
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  linkText: {
    color: 'lightblue',
    fontSize: 20,
  },
}

class Auth extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', error: '' }

  handleSubmit = () => {
    const { dispatch, type, history } = this.props;
    const { email, password, passwordConfirmation } = this.state;
    if(type === 'Register')
      dispatch(register(email, password, passwordConfirmation, history))
    else
      dispatch(loginUser(email, password, history))
    this.setState({ email: '', password: '', passwordConfirmation: '' })
  }

  canSubmit = () => {
    const { email, password, passwordConfirmation } = this.state;
    let submit = false;
    let error;
    if( email && password )
      submit = true
    if( this.props.type === 'Register' ) {
      if( !passwordConfirmation ) {
        submit = false
      } else if ((passwordConfirmation && password) && passwordConfirmation !== password) {
        error = "Passwords must match"
        submit = false
        if(!this.state.error)
          this.setState({ error })
      } else {
        if (this.state.error)
          this.setState({ error: '' })
        submit = true
      }
    }
    return submit
  }

  render() {
    const { email, password, passwordConfirmation, error } = this.state;
    const { type } = this.props;
    const valid = this.canSubmit();
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {
          error !== '' && <Text style={styles.errorText}>{error}</Text>
        }
        <Text>{type}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autofocus
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          keyboardType="email-address"
          onChangeText={ email => this.setState({ email }) }
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          onChangeText={ password => this.setState({ password }) }
        />
        { type === 'Register' &&
          <TextInput
            style={styles.input}
            placeholder="Password Confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            value={passwordConfirmation}
            secureTextEntry={true}
            onChangeText={ passwordConfirmation => this.setState({ passwordConfirmation }) }
          />
        }
        <TouchableOpacity onPress={valid ? this.handleSubmit : f => f}>
          <Text style={styles.buttonText}>{type}</Text>
        </TouchableOpacity>
        <Link to={ type === 'Register' ? '/login' : '/register' } >
          <Text style={styles.linkText}>
            { type === 'Register' ? 'Login' : 'Register' }
          </Text>
        </Link>
        </KeyboardAvoidingView>
    )
  }
}

export default connect()(Auth);
