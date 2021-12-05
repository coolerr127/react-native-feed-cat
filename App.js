import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Main() {
	const [count, setCount] = useState(0)
	const [cat, setCat] = useState(true)

	async function increaseCount() {
		setCount(count + 1)
		if ((count + 1) % 10) {
			setCat(true)
		} else {
			setCat(false)
		}
		const date = new Date()
		const d = date.getDay() + 1
		const m = date.getMonth() + 1
		const y = date.getFullYear()
		const h = date.getHours()
		const mm = date.getMinutes()
		const formatedDate = `${d}-${m}-${y} ${h}:${mm}`

		let score = {
			date: formatedDate,
			score: count,
		}

		let scores = JSON.parse(await AsyncStorage.getItem('score'))

		// AsyncStorage.setItem('score', JSON.stringify([]))
		// return

		if (scores.length === 0) {
			await AsyncStorage.setItem('score', JSON.stringify([score]))
		} else {
			let test = true
			scores.map(item => {
				if (item.date === score.date) {
					item.score = count
					AsyncStorage.setItem('score', JSON.stringify(scores))
					test = false
					return
				}
			})
			if (test) {
				setCount(0)
				scores.push(score)
				await AsyncStorage.setItem('score', JSON.stringify(scores))
			}
		}

		// console.log('SCORE', await AsyncStorage.getItem('score'))
	}

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text>Results: {count}</Text>
			{cat ? (
				<MaterialCommunityIcons name='cat' size={300} color='black' />
			) : (
				<MaterialCommunityIcons name='cat' size={300} color='red' />
			)}

			<Button title='Feed' onPress={() => increaseCount()} />
		</View>
	)
}

function Results() {
	const [scoreInformation, setScoreInformation] = useState()

	useEffect(() => {
		AsyncStorage.getItem('score').then(data => {
			setScoreInformation(JSON.parse(data))
		}, scoreInformation)
	})

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			{scoreInformation?.map((score, key) => (
				<Text key={key}>
					You scored {score.score + 1} points on Date: {score.date}
				</Text>
			))}
			{/* <Button title='Reload' onPress={() => getScore()} /> */}
		</View>
	)
}

function About() {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text style={{ fontWeight: 'bold', fontSize: 30 }}>
				981063{'\n'}
				{'\n'}Шиманович Антон Васильевич{'\n'}
				{'\n'}ЛР №1
			</Text>
		</View>
	)
}

const Tab = createMaterialBottomTabNavigator()

function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName='Feed'
			activeColor='#e91e63'
			labelStyle={{ fontSize: 12 }}
			style={{ backgroundColor: 'tomato' }}
		>
			<Tab.Screen
				name='Main'
				component={Main}
				options={{
					tabBarLabel: 'Main',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='home'
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Results'
				component={Results}
				options={{
					tabBarLabel: 'Results',
					tabBarIcon: ({ color }) => (
						<Fontisto name='prescription' size={24} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name='About'
				component={About}
				options={{
					tabBarLabel: 'About',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='account'
							color={color}
							size={26}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default function App() {
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	)
}
