import React from "react";
import Link from "next/link";
import styles from "../styles/home.module.scss";

export enum Difficulty {
	Easy,
	Medium,
	Hard,
	Expert,
}

type DifficultyButtonProps = {
	difficulty: Difficulty;
};

export class DifficultyButton extends React.Component<DifficultyButtonProps> {
	render() {
		return (
			<Link href="/solve?difficulty={Difficulty[this.props.difficulty]}">
				<div className={styles.difficultyButton}>
					{Difficulty[this.props.difficulty]}
				</div>
			</Link>
		);
	}
}
