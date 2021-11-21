import React from "react";
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

export class Leaderboard extends React.Component {
	render() {
		return (
			<div className={styles.leaderboard}>
				<div className={styles.leaderboardHeader}>
					<h4>Index</h4>
					<h4>Name</h4>
					<h4>Score</h4>
				</div>
				<ul className={styles.leaderboardList}>
					<LeaderboardItem
						index={1}
						name="Elias Jörgensen"
						score={69420}
					/>
					<LeaderboardItem index={2} name="saile515" score={42069} />
					<LeaderboardItem
						index={3}
						name="wojihfiyewgfiylfkfrgrggegegegegebdhfe"
						score={9999999999}
					/>
					<LeaderboardItem index={4} name="saile515" score={42069} />
					<LeaderboardItem index={5} name="saile515" score={42069} />
					<LeaderboardItem index={6} name="saile515" score={42069} />
					<LeaderboardItem index={7} name="saile515" score={42069} />
					<LeaderboardItem index={8} name="saile515" score={42069} />
					<LeaderboardItem index={9} name="saile515" score={42069} />
					<LeaderboardItem index={10} name="saile515" score={42069} />
				</ul>
			</div>
		);
	}
}
