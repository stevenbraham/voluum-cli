#!/usr/bin/env node

import Settings from "./src/library/Settings";
import VoluumApi from "./src/library/VoluumApi";
import dayjs from "dayjs";

const commander = require("commander");

commander.command("stats [from] [till]")
    .alias("s")
    .description("Retrieve overall campaign stats. Defaults to today.")
    .action((from?: string, till?: string) => {
        const startDate = from !== undefined ? dayjs(from) : dayjs();
        const endDate = till !== undefined ? dayjs(till) : dayjs().add(1, "d");

        const voluumApi = new VoluumApi(Settings.getVoluumSettings());

        voluumApi.getTotalStats(startDate, endDate).then((stats) => {
            console.log(stats);
        });
    });

commander.name("Voluum CLI");
commander.parse(process.argv);
