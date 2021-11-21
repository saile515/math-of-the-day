import React from "react";
import styles from "../styles/home.module.scss";
import { DifficultyButton, Difficulty } from "./Difficulty";
import { Leaderboard } from "./Leaderboard";
import { Profile } from "./Profile";

interface DifficultySelectorProps {}

interface DifficultySelectorState {
	clicked: boolean;
}

export class HomePageContent extends React.Component<
	DifficultySelectorProps,
	DifficultySelectorState
> {
	constructor(props: DifficultySelectorProps) {
		super(props);
		this.state = { clicked: false };

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({ clicked: !this.state.clicked });
	}

	render() {
		let content;
		if (this.state.clicked == true) {
			content = (
				<div className={styles.difficultySelector}>
					<h2 className={styles.subheading}>Select difficulty</h2>
					<div className={styles.difficultyContainer}>
						<DifficultyButton difficulty={Difficulty.Easy} />
						<DifficultyButton difficulty={Difficulty.Medium} />
						<DifficultyButton difficulty={Difficulty.Hard} />
						<DifficultyButton difficulty={Difficulty.Expert} />
						<DifficultyButton difficulty={Difficulty.Impossible} />
					</div>
					<button
						className={styles.backButton}
						onClick={this.handleClick}
					>
						🡸
					</button>
				</div>
			);
		} else {
			content = (
				<div className={styles.mainContentContainer}>
					<button
						className={styles.mainButton}
						onClick={this.handleClick}
					>
						Solve
					</button>
					<div className={styles.mainContent}>
						<Leaderboard />
						<Profile />
					</div>
				</div>
			);
		}
		return content;
	}
}
