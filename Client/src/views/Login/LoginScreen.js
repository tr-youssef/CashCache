import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { callAPI } from "../../utils/fetch/callAPI";
import { colors } from "../../utils/theme/theme.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validatePassword = () => {
    if (password.length < 6) {
      setError("Invalid password. Must be at least 6 characters");
      passwordRef.current?.focus();
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      emailRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError("");

    if (!validateEmail() || !validatePassword()) {
      return;
    }
    await callAPI("/api/users/signup", "POST", {
      email: email,
      password: password,
    })
      .then(async (response) => {
        if (response.token) {
          await AsyncStorage.setItem("token", response.token);
          navigation.navigate("Home");
        } else setError(response.message);
      })
      .catch((error) => setError("Sign up error: " + error.message));
  };

  const handleLogin = async () => {
    setError("");

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    await callAPI("/api/users/signin", "POST", {
      email: email,
      password: password,
    })
      .then(async (response) => {
        if (response.token) {
          await AsyncStorage.setItem("token", response.token);
          navigation.navigate("Home");
        } else setError(response.message);
      })
      .catch((error) => setError("Sign in error: " + error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          ref={emailRef}
          keyboardType="email-address"
          blurOnSubmit={false}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, error && styles.errorInput]}
        />
        <TextInput
          placeholder="Password"
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, error && styles.errorInput]}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.dark.greenElec,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: colors.dark.greenElec,
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: colors.dark.greenElec,
    fontWeight: "700",
    fontSize: 16,
  },
});
