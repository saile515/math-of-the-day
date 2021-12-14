import { credentials } from "../backend/database/register";
import styles from "../styles/circularChart.module.scss";

interface SolvedDifficultyProps {
	data: credentials;
}

export function SolvedDifficulty(props: SolvedDifficultyProps) {
	const solvedDifficulty: any = {
		Easy: 0,
		Medium: 0,
		Hard: 0,
		Expert: 0,
		Impossible: 0,
	};

	for (let i = 0; i < props.data.solved.length; i++) {
		solvedDifficulty[props.data.solved[i].difficulty]++;
	}

	const totalSolved =
		solvedDifficulty.Easy +
		solvedDifficulty.Medium +
		solvedDifficulty.Hard +
		solvedDifficulty.Expert +
		solvedDifficulty.Impossible;

	if (totalSolved) {
		return (
			<div className={styles.chart}>
				<svg viewBox="0 0 36 36">
					<path
						className={styles.circle}
						d={`M18 2.0845 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 31.831 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 -31.831`}
						strokeDasharray={`${
							100 * (solvedDifficulty.Easy / totalSolved)
						}, 100`}
						stroke="#00dd00"
					/>
					<path
						className={styles.circle}
						d={`M18 2.0845 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 31.831 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 -31.831`}
						strokeDasharray={`${
							100 * (solvedDifficulty.Medium / totalSolved)
						}, 100`}
						strokeDashoffset={`${-(
							100 *
							(solvedDifficulty.Easy / totalSolved)
						)}`}
						stroke="#eeee00"
					/>
					<path
						className={styles.circle}
						d={`M18 2.0845 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 31.831 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 -31.831`}
						strokeDasharray={`${
							100 * (solvedDifficulty.Hard / totalSolved)
						}, 100`}
						strokeDashoffset={`${-(
							100 *
							((solvedDifficulty.Easy + solvedDifficulty.Medium) /
								totalSolved)
						)}`}
						stroke="#ff9900"
					/>
					<path
						className={styles.circle}
						d={`M18 2.0845 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 31.831 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 -31.831`}
						strokeDasharray={`${
							100 * (solvedDifficulty.Expert / totalSolved)
						}, 100`}
						strokeDashoffset={`${-(
							100 *
							((solvedDifficulty.Easy +
								solvedDifficulty.Medium +
								solvedDifficulty.Hard) /
								totalSolved)
						)}`}
						stroke="#ff0000"
					/>
					<path
						className={styles.circle}
						d={`M18 2.0845 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 31.831 a ${100 / (Math.PI * 2)} ${
							100 / (Math.PI * 2)
						} 0 0 1 0 -31.831`}
						strokeDasharray={`${
							100 * (solvedDifficulty.Impossible / totalSolved)
						}, 100`}
						strokeDashoffset={`${-(
							100 *
							((solvedDifficulty.Easy +
								solvedDifficulty.Medium +
								solvedDifficulty.Hard +
								solvedDifficulty.Expert) /
								totalSolved)
						)}`}
						stroke="#800080"
					/>
					<foreignObject
						x="20%"
						y="10%"
						width="60%"
						height="80%"
						textAnchor="center"
					>
						<div
							data-xmlns="http://www.w3.org/1999/xhtml"
							className={styles.textContainer}
						>
							<p className={styles.text}>
								Average solved difficulty
							</p>
						</div>
					</foreignObject>
				</svg>
				<ul className={styles.chartList}>
					<li className={styles.chartListItem}>
						<div style={{ backgroundColor: "#00dd00" }}></div>
						<p>- Easy</p>
					</li>
					<li className={styles.chartListItem}>
						<div style={{ backgroundColor: "#eeee00" }}></div>
						<p>- Medium</p>
					</li>
					<li className={styles.chartListItem}>
						<div style={{ backgroundColor: "#ff9900" }}></div>
						<p>- Hard</p>
					</li>
					<li className={styles.chartListItem}>
						<div style={{ backgroundColor: "#ff0000" }}></div>
						<p>- Expert</p>
					</li>
					<li className={styles.chartListItem}>
						<div style={{ backgroundColor: "#800080" }}></div>
						<p>- Impossible</p>
					</li>
				</ul>
			</div>
		);
	}
	return <div></div>;
}
