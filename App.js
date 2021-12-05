import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'

function Main() {
	const [score, setScore] = useState(0)

	useEffect(() => {
		// AsyncStorage.setItem('@score', `${score}`)
	}, [score])

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text>Results: {score}</Text>
			<MaterialCommunityIcons name='cat' size={300} color='black' />
			<Button title='Feed' onPress={() => setScore(score + 1)} />
		</View>
	)
}

function Results() {
	let score = 0

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text>{score}</Text>
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
				{'\n'}ЛБ №1
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
