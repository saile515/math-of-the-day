import React from "react";
import Link from "next/link";
import styles from "../styles/home.module.scss";

export class Difficulty {
	public static readonly Easy = new Difficulty(4, 8, "Easy");
	public static readonly Medium = new Difficulty(4, 8, "Medium");
	public static readonly Hard = new Difficulty(4, 8, "Hard");
	public static readonly Expert = new Difficulty(4, 8, "Expert");
	public static readonly Impossible = new Difficulty(4, 8, "Impossible");

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
			<Link href={"/solve?difficulty=" + this.props.difficulty}>
				<div className={styles.difficultyButton}>
					<h2>{this.props.difficulty.name}</h2>
					<p>{this.props.difficulty.ages}</p>
				</div>
			</Link>
		);
	}
}
