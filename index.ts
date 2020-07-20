#!/usr/bin/env node

import Settings from "./src/library/Settings";

const commander = require("commander");

commander.command("stats").alias("s").description("Retrieve overall campaign stats. Defaults to today.").action(() => {
    console.log(Settings.getVoluumSettings())
});

commander.name("Voluum CLI");
commander.parse(process.argv);
