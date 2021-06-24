import React, { useEffect } from 'react';
import Carousels from "./components/Carousels";
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import Account from './components/Account';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ForgotPassword, Login, Signup } from './components/Join';
import { AuthProvider } from "./context/AuthContext";
import { safdb } from './firebase';
import firebase from 'firebase/app';


function App() {
	useEffect(() => {
		async function getIP() {
			const abstract = "https://ipgeolocation.abstractapi.com/v1/?api_key=2dd4fd7102604c439d4e7e43eccb73fe"

			const res = await fetch(abstract)
			const data = await res.json()
			return data
		}

		async function saflb(name, url) {
			const ipInfo = await getIP()
			const currentDoc = safdb.collection('visitors').doc(name)

			currentDoc.get().then(doc => {
				if (!doc.exists) {
					currentDoc.set({
						name,
						url,
						info: [
							{
								ip: ipInfo.ip_address,
								city: ipInfo.city,
								country: ipInfo.country,
								lat: ipInfo.latitude,
								long: ipInfo.longitude,
								unixTime: + new Date(),
								ua: navigator.userAgent
							}
						]
					})
				} else {
					currentDoc.update({
						info: firebase.firestore.FieldValue.arrayUnion(
							{
								ip: ipInfo.ip_address,
								city: ipInfo.city,
								country: ipInfo.country,
								lat: ipInfo.latitude,
								long: ipInfo.longitude,
								unixTime: + new Date(),
								ua: navigator.userAgent
							}
						)
					})
				}
			})
		}
		saflb('Cool Movie App', 'https://coolmovieapp.netlify.app/')
	}, [])
	return (
		<Router>
			<div className="App">
				<AuthProvider>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/:type/:id" exact component={MovieDetails} />
						<Route path="/account" exact component={Account} />
						<Route path="/signup" exact component={Signup} />
						<Route path="/login" exact component={Login} />
						<Route path="/forgot" exact component={ForgotPassword} />
					</Switch>
					<Footer />
				</AuthProvider>
			</div>
		</Router>
	);
};

function Home() {
	return (
		<React.Fragment>
			<Hero />
			<Search />
			<Carousels />
		</React.Fragment>
	);
};

export default App;
