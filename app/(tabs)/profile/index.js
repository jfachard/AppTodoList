import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Me from "../../../assets/Me_.jpg";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

const index = () => {
  const [taskCompleted, setTaskComplete] = useState(0);
  const [taskPending, setTaskPending] = useState(0);

  const fetchedTaskData = async () => {
    try {
      const response = await axios.get("http://192.168.1.12:3000/todos/count");
      const { totalCompletedTask, totalPendingTask } = response.data;

      setTaskComplete(totalCompletedTask);
      setTaskPending(totalPendingTask);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchedTaskData();
  }, []);
  console.log("completed", taskCompleted);
  console.log("pending", taskPending);
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={Me}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Keep plans for 15 days
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
            Select Categories
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 12 }}>
        <Text>Tasks Overview</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#D5D8DC",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {taskCompleted}
            </Text>
            <Text style={{ marginTop: 4 }}>Task Completed</Text>
          </View>

          <View
            style={{
              backgroundColor: "#D5D8DC",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {taskPending}
            </Text>
            <Text style={{ marginTop: 4 }}>Task Pending</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [taskPending, taskCompleted],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisInterval={2}
        chartConfig={{
          backgroundColor: "#34495E",
          backgroundGradientFrom: "#1C2833",
          backgroundGradientTo: "#ABB2B9",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#808B96",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
      <View
        style={{
          backgroundColor: "#D5D8DC",
          padding: 10,
          borderRadius: 6,
          marginTop: 15,
        }}
      >
        <Text style={{ textAlign: "center"}}>
          Tasks for the next seven days
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          style={{ width: 120, height: 120 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9537/9537221.png",
          }}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
