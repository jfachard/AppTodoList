import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'

const index = () => {
  const today = moment().format("DD-MM-YYYY")
  const [selected, setSelected] = useState(today)
  const [todos, setTodos] = useState([])
  
  const fetchCompleted = async() => {
    try {
      const response = await axios.get(`http://192.168.1.12:3000/todos/completed/${selected}`)

      const completedTodos = response.data.completedTodos || []
      setTodos(completedTodos)

    } catch (error) {
      console.log("error",error)
    }
  }

  useEffect(() => {
    fetchCompleted()
  }, [selected])

  console.log(todos)

  const handleDayPress = (day) => {
    setSelected(day.dateString)
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selected]: { selected: true, selectedColor: "#7CB9E8" },
        }}
      />
      <View style={{marginTop:20}}/>

      <View style={{flexDirection:"row", alignItems:"center", gap:5, marginVertical:10, marginHorizontal:10}}>
        <Text>Task complete</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>

      {todos?.map((item, index) => (
        <Pressable
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderRadius: 7,
            marginVertical: 10,
            marginHorizontal: 10
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="circle" size={18} color="gray" />
            <Text style={{ flex: 1, textDecorationLine:"line-through", color:"gray" }}>{item?.title}</Text>
            <Feather name="flag" size={20} color="gray" />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

export default index

const styles = StyleSheet.create({})