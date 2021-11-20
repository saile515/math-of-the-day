import React from "react";
import type { NextPage } from "next";
import { DifficultyButton, Difficulty } from "../components/Difficulty";
import styles from "../styles/home.module.scss";

const Home: NextPage = () => {
	return (
		<div className={styles.difficultyContainer}>
			<DifficultyButton difficulty={Difficulty.Easy} />
			<DifficultyButton difficulty={Difficulty.Medium} />
			<DifficultyButton difficulty={Difficulty.Hard} />
			<DifficultyButton difficulty={Difficulty.Expert} />
			<DifficultyButton difficulty={Difficulty.Impossible} />
		</div>
	);
};

export default Home;
