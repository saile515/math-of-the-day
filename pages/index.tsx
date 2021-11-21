import React from "react";
import type { NextPage } from "next";
import styles from "../styles/home.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomePageContent } from "../components/HomePageContent";

const Home: NextPage = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.header}>
				<h1 className={styles.title}>Math of the Day</h1>
			</div>
			<HomePageContent />
		</div>
	);
};

export default Home;
