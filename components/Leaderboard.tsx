import React, { ReactElement, useEffect, useState } from "react";
import styles from "../styles/leaderboard.module.scss";

interface leaderboardItemInterface {
	index: number;
	name: string;
	score: number;
}

class LeaderboardItem extends React.Component<leaderboardItemInterface> {
	render() {
		return (
			<li className={styles.leaderboardItem}>
				<p className={styles.leaderboardItemIndex}>
					{this.props.index}
				</p>
				<p className={styles.leaderboardItemName}>{this.props.name}</p>
				<p className={styles.leaderboardItemScore}>
					{this.props.score}
				</p>
			</li>
		);
	}
}

export function Leaderboard() {
	const [leaderboardItems, setLeaderboardItems] = useState<ReactElement[]>();

	useEffect(() => {
		fetch("/api/leaderboard")
			.then((data) => data.json())
			.then((data) => {
				const items: ReactElement[] = [];
				for (let i = 0; i < data.length; i++) {
					items.push(
						<LeaderboardItem
							key={i}
							name={data[i].name}
							score={data[i].score}
							index={data[i].index}
						/>
					);
				}
				setLeaderboardItems(items);
			});
	}, []);

	return (
		<div className={styles.leaderboard}>
			<div className={styles.leaderboardHeader}>
				<h4>Index</h4>
				<h4>Name</h4>
				<h4>Score</h4>
			</div>
			<ul className={styles.leaderboardList}>{leaderboardItems}</ul>
		</div>
	);
}
