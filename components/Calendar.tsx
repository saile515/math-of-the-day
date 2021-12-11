import { ReactElement, useEffect, useState } from "react";
import styles from "../styles/calender.module.scss";
import { credentials } from "../backend/database/signup";

function daysInMonth(month: number) {
	var d = new Date(new Date().getFullYear(), month + 1, 0);
	return d.getDate();
}

function getSolvedProblems(problems: { date: Date; difficulty: string }[]) {
	const month = new Date().getMonth();
	const year = new Date().getFullYear();

	const solvedProblems: boolean[] = [];

	for (let i = 0; i < problems.length; i++) {
		const date = new Date(problems[i].date);
		if (date.getFullYear() == year && date.getMonth() == month) {
			solvedProblems[date.getDate() - 1] = true;
		}
	}

	return solvedProblems;
}

interface CalendarTileProps {
	solved: boolean;
	date: number;
	currentDay?: boolean;
}

function CalendarTile(props: CalendarTileProps) {
	if (props.solved) {
		return (
			<div
				className={`${styles.tile} ${styles.solvedTile} ${
					props.currentDay ? "today" : ""
				}`}
			>
				{props.date}
			</div>
		);
	}

	return (
		<div
			className={`${styles.tile} ${styles.unsolvedTile} ${
				props.currentDay ? styles.today : ""
			}`}
		>
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
		const isToday: boolean = new Date().getDate() == i + 1;
		dateTiles.push(
			<CalendarTile
				key={i}
				solved={solvedProblems[i]}
				date={i + 1}
				currentDay={isToday}
			/>
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
