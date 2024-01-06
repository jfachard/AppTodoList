import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from "react";
import { useRouter } from "expo-router";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const router = useRouter()

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0E3386" }}>
          TODO-LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 20 }}>
            Register in to your account
          </Text>
        </View>
        
        <View style={{marginTop: 70}}>
          <View 
            style={{
                flexDirection:"row",
                alignItems:"center",
                backgroundColor:"#DFDFDF",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30
          }}>
            <MaterialIcons style={{marginLeft:8, marginRight:3}} name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="email"
            />
          </View>

          <View 
            style={{
                flexDirection:"row",
                alignItems:"center",
                backgroundColor:"#DFDFDF",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30
          }}>
            <FontAwesome style={{marginLeft:11, marginRight:9}} name="lock" size={24} color="gray" />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 17 : 17,
              }}
              placeholder="password"
            />
          </View>

          <View style={{marginTop:60}}/>

          <Pressable style={{width:200, backgroundColor:"#0076CE", padding:15, borderRadius:6, marginLeft:"auto", marginRight:"auto"}}>
            <Text style={{textAlign:"center", color:"white", fontWeight:"bold", fontSize:16}}>Register</Text>
          </Pressable>

          <Pressable onPress={() => router.replace("/login")} style={{marginTop:15}}>
            <Text style={{textAlign:"center", fontSize:15, color:"gray"}}>Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
