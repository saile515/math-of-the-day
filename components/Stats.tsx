import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { credentials } from "../backend/database/signup";
import { Calendar } from "./Calendar";
import styles from "../styles/stats.module.scss";

interface StatsProps {
	session: Session;
}

export function Stats(props: StatsProps) {
	const [profile, setProfileData] = useState<credentials>({});

	useEffect(() => {
		fetch(`/api/profile/${props.session.user.id}`)
			.then((data) => data.json())
			.then((data) => {
				setProfileData(data);
			});
	}, []);

	return (
		<div className={styles.statsContainer}>
			<p className={styles.name}>{profile.name}</p>
			<p className={styles.email}>{profile.email}</p>
			<p className={styles.score}>
				Score: <span>{profile.score}</span>
			</p>
			{profile.solved ? <Calendar data={profile} /> : []}
		</div>
	);
}
