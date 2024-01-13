import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const index = () => {
  const [taskCompleted, setTaskComplete] = useState(0)
  const [taskPending, setTaskPending] = useState(0)

  const fetchedTaskData = async () => {
    try {
      const response = await axios.get("http://192.168.1.12:3000/todos/count")
      const { totalCompletedTask, totalPendingTask } = response.data

      setTaskComplete(totalCompletedTask)
      setTaskPending(totalPendingTask)

    } catch (error) {
      console.log("error", error)
    }
  }
  useEffect(() => {
    fetchedTaskData
  }, [])
  console.log("completed", taskCompleted)
  console.log("pending", taskPending)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})