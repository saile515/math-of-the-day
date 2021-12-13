import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { credentials } from "../backend/database/register";
import { Calendar } from "./Calendar";
import styles from "../styles/stats.module.scss";
import { SolvedDifficulty } from "./SolvedDifficulty";

interface StatsProps {
	session: Session;
}

export function Stats(props: StatsProps) {
	const [profile, setProfileData] = useState<credentials>({});

	useEffect(() => {
		console.log(`/api/profile/${props.session.user.id}`);
		fetch(`/api/profile/${props.session.user.id}`)
			.then((data) => data.json())
			.then((data) => {
				setProfileData(data);
			});
	}, []);

	return (
		<div className={styles.statsContainer}>
			<div className={styles.basicStats}>
				<p className={styles.name}>{profile.name}</p>
				<p className={styles.email}>{profile.email}</p>
				<p className={styles.score}>
					Score: <span>{profile.score}</span>
				</p>
			</div>
			{profile.solved ? (
				<div className={styles.mainStats}>
					<Calendar data={profile} />
					<SolvedDifficulty data={profile} />
				</div>
			) : (
				[]
			)}
		</div>
	);
}
