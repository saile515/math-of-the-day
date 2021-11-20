import React from "react";
import type { NextPage } from "next";
import { DifficultyButton, Difficulty } from "../components/Difficulty";
import styles from "../styles/home.module.scss";

const Home: NextPage = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.header}>
				<h1 className={styles.title}>Math of the Day</h1>
				<h2 className={styles.subheading}>Select difficulty</h2>
			</div>
			<div className={styles.difficultyContainer}>
				<DifficultyButton difficulty={Difficulty.Easy} />
				<DifficultyButton difficulty={Difficulty.Medium} />
				<DifficultyButton difficulty={Difficulty.Hard} />
				<DifficultyButton difficulty={Difficulty.Expert} />
				<DifficultyButton difficulty={Difficulty.Impossible} />
			</div>
		</div>
	);
};

export default Home;
