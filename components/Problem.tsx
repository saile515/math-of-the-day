import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { problemData } from "../backend/database/problem";
import Image from "next/image";

export function Problem() {
	const router = useRouter();
	const [data, setData] = useState<problemData>({
		difficulty: "",
		title: "",
		problem: "",
		image: "https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-32/90/calculator-512.png",
		date: new Date(),
	});
	useEffect(() => {
		if (router && router.query.solve) {
			fetch("/api/solve/" + router.query.solve)
				.then((response) => response.json())
				.then((problemData) => {
					setData(problemData);
				});
		}
	}, [router]);

	if (data) {
		return (
			<div>
				<h1>{data.title}</h1>
				<h2>{data.difficulty}</h2>
				<p>{data.problem}</p>
				<Image src={data.image} alt="Image" />
			</div>
		);
	}

	return <p>Error</p>;
}
