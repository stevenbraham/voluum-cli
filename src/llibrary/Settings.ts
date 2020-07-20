import VoluumApiSettings from "./VoluumApiSettings";
import path from "path";
import fs from "fs";
import YAML from 'yaml'

export default class Settings {
    static getVoluumSettings(): VoluumApiSettings {

        //check if config file exists
        let settingsFilePath = path.join(process.cwd(), "config.yaml");
        if (fs.existsSync(settingsFilePath)) {
            let settingsFileContents = fs.readFileSync(settingsFilePath);
            let YAMLContents = YAML.parse(settingsFileContents.toString());
            if (YAMLContents.voluum) {
                return YAMLContents.voluum;
            } else {
                throw new Error("Voluum settings missing");
            }
        } else {
            throw new Error("config.yaml is missing");
        }
    }
}