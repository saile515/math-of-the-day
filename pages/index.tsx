import React from "react";
import type { NextPage } from "next";
import { DifficultyButton, Difficulty } from "../components/Difficulty";

const Home: NextPage = () => {
	return <DifficultyButton difficulty={Difficulty.Easy} />;
};

export default Home;
