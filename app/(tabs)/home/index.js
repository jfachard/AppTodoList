import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign, Ionicons, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { BottomModal, ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";
import axios from "axios";
import moment from "moment";

const index = () => {
  const [todos, setTodos] = useState([])
  const today = moment().format("MMM Do")
  const [isModalVisible, setModalVisible] = useState(false)
  const [category, setCategory] = useState("All")
  const [todo, setTodo] = useState("")
  const [isPending, setPending] = useState([])
  const [isCompleted, setCompleted] = useState([])
  const [markedComplete, setMarkedComplete] = useState(false)
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go to the Gym",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take vitamin reminder",
    },
    {
      id: "4",
      todo: "Go to the Mall",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
    {
      id: "6",
      todo: "Go to the grocery",
    },
  ]
  const addTodo = async() => {
    try {
      const todoData = {
        title:todo,
        category:category,
      }

      axios.post("http://192.168.1.12:3000/todos/659ad9fd3e5c753d793030e4", todoData).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log("error", error)
      })

      setModalVisible(false)
      setTodo("")
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    getUserTodos()
  }, [markedComplete])

  const getUserTodos = async () => {
    try {
      const response = await axios.get("http://192.168.1.12:3000/users/659ad9fd3e5c753d793030e4/todos")

      console.log(response.data.todos)
      setTodos(response.data.todos)

      const fetchedTodos = response.data.todos || [] 
      const pending = fetchedTodos.filter((todo) => todo.status !== "completed")
      const completed = fetchedTodos.filter((todo) => todo.status === "completed")

      setPending(pending)
      setCompleted(completed)
    } catch (error) {
      console.log("error", error)
    }
  }

  const markAsCompleted = async(todoId) => {
    try {
      setMarkedComplete(true)
      const response = await axios.patch(`http://192.168.1.12:3000/todos/${todoId}/complete`)
      console.log(response.data)
    } catch (error) {
      console.log("error",error)
    }
  }

  console.log("completed", isCompleted)
  console.log("pending", isPending)
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
          <AntDesign name="pluscircle" size={30} color="#007FFF" />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {isPending?.length > 0 && <Text>To Do {today}</Text>}

              {isPending?.map((item, index) => (
                <Pressable
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
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
                    <Entypo onPress={() => markAsCompleted(item?.id)} name="circle" size={18} color="black" />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}

              {isCompleted?.length > 0 && (
                <View>
                  <View style={{justifyContent:"center", alignItems:"center", margin:10}}>
                    <Image style={{ width: 100, height: 100}} source={{uri: "https://cdn-icons-png.flaticon.com/128/6784/678455.png"}}/>
                  </View>
                  <View style={{flexDirection:"row", alignItems:"center", gap:5, marginVertical:10}}>
                    <Text>Task complete</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                  </View>
                  {isCompleted?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
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
                        <Entypo name="circle" size={18} color="black" />
                        <Text style={{ flex: 1, textDecorationLine:"line-through", color:"gray" }}>{item?.title}</Text>
                        <Feather name="flag" size={20} color="gray" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  url: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Tasks for today! add a task
              </Text>
              <Pressable
                onPress={() => setModalVisible(!isModalVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChange={(text) => setTodo(text)}
              placeholder="Input a new task"
              style={{
                padding: 10,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Ionicons onPress={addTodo} name="send" size={24} color="#007FFF" />
          </View>
          <Text>Choose Category</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("WhishList")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>WhisList</Text>
            </Pressable>
          </View>
          <Text>Some suggestions:</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={{
                  backgroundColor: "#F0F8FF",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
                key={index}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
