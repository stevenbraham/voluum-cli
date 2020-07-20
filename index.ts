#!/usr/bin/env node

import Settings from "./src/library/Settings";
import VoluumApi from "./src/library/VoluumApi";
import dayjs from "dayjs";

require('console.table');
const commander = require("commander");

commander.command("total-stats [from] [till]")
    .alias("ts")
    .description("Retrieve overall campaign stats. Defaults to today.")
    .action((from?: string, till?: string) => {
        const startDate = from !== undefined ? dayjs(from) : dayjs();
        const endDate = till !== undefined ? dayjs(till) : dayjs().add(1, "d");

        const voluumApi = new VoluumApi(Settings.getVoluumSettings());

        voluumApi.getTotalStats(startDate, endDate).then((stats) => {
            console.table(stats);
        });
    });

commander.name("Voluum CLI");
commander.parse(process.argv);
