import { ReactElement, useEffect, useState } from "react";
import styles from "../styles/calender.module.scss";
import { credentials } from "../backend/database/signup";

interface CalendarTileProps {
	solved: boolean;
	date: number;
}

function daysInMonth(month: number) {
	var d = new Date(new Date().getFullYear(), month + 1, 0);
	return d.getDate();
}

function getSolvedProblems(problems: Date[]) {
	const month = new Date().getMonth();
	const year = new Date().getFullYear();

	const solvedProblems: boolean[] = [];

	for (let i = 0; i < problems.length; i++) {
		if (
			problems[i].getFullYear() == year &&
			problems[i].getMonth() == month
		) {
			solvedProblems.push(true);
		} else {
			solvedProblems.push(false);
		}
	}

	return solvedProblems;
}

function CalendarTile(props: CalendarTileProps) {
	if (props.solved) {
		return (
			<div className={`${styles.tile} ${styles.solvedTile}`}>
				{props.date}
			</div>
		);
	}

	return (
		<div className={`${styles.tile} ${styles.unsolvedTile}`}>
			{props.date}
		</div>
	);
}

interface CalendarProps {
	data: credentials;
}

export function Calendar(props: CalendarProps) {
	const dateTiles: ReactElement[] = [];
	const [fillerSize, setFillerSize] = useState<number>();

	const solvedProblems = getSolvedProblems(props.data.solved);
	for (let i = 0; i < daysInMonth(new Date().getMonth()); i++) {
		dateTiles.push(
			<CalendarTile key={i} solved={solvedProblems[i]} date={i + 1} />
		);
	}

	useEffect(() => {
		setFillerSize(
			new Date(
				new Date(new Date().getFullYear(), new Date().getMonth())
			).getDay()
		);
	}, []);

	return (
		<div className={styles.calendarContainer}>
			<div className={`${styles.calendarFiller} calendarFiller`}></div>
			{dateTiles}

			<style jsx>{`
				.calendarFiller {
					grid-column-start: ${`span ${fillerSize - 1}`};
				}
			`}</style>
		</div>
	);
}
