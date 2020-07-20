#!/usr/bin/env node

const commander = require("commander");

commander.command("stats").alias("s").description("Retrieve overall campaign stats. Defaults to today.").action(() => {

});

commander.name("Voluum CLI");
commander.parse(process.argv);
