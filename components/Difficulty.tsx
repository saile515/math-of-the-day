import React from "react";
import Link from "next/link";
import styles from "../styles/home.module.scss";

export class Difficulty {
	public static readonly Easy = new Difficulty(4, 7, "Easy");
	public static readonly Medium = new Difficulty(8, 11, "Medium");
	public static readonly Hard = new Difficulty(12, 15, "Hard");
	public static readonly Expert = new Difficulty(16, 19, "Expert");
	public static readonly Impossible = new Difficulty(
		20,
		99,
		"Impossible",
		"20+"
	);

	private constructor(
		public readonly minAge: number,
		public readonly maxAge: number,
		public readonly name: string,
		public readonly ages: string = minAge + "-" + maxAge
	) {}
}
type DifficultyButtonProps = {
	difficulty: Difficulty;
};

export class DifficultyButton extends React.Component<DifficultyButtonProps> {
	render() {
		return (
			<Link href={"/solve/" + this.props.difficulty.name}>
				<div className={styles.difficultyButton}>
					<h2>{this.props.difficulty.name}</h2>
					<p>Age: {this.props.difficulty.ages}</p>
				</div>
			</Link>
		);
	}
}
