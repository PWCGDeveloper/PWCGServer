import * as fs from 'fs';
import { StringUtils } from '../utils/stringutils'

export class FileUtils {

    static getSubDirectories(dir: string): string[] {
        let subdirectories: string[] = [];

        var fs = fs || require('fs');
        let files = fs.readdirSync(dir);
        files.forEach(function (file) {
            if (fs.statSync(dir + '/' + file).isDirectory()) {
                subdirectories.push(file);
            }
            else {
            }
        });

        return subdirectories;
    }

    static getJsonFiles(directoryPath: string): string[] {
        let jsonFiles: string[] = [];
        let files = fs.readdirSync(directoryPath);
        files.forEach(function (file) {
            if (StringUtils.endsWith(file, '.json')) {
                jsonFiles.push(file);
            }
        });

        return jsonFiles;
    }

    static getFileContents(filepath: string): any {
        if (this.fileExists(filepath)) {

            let content = fs.readFileSync(filepath);
            return content;
        }

        return null;
    }

    static writeFile(filepath: string, json: any) {
        if (!this.fileExists(filepath)) {

            let content = fs.writeFileSync(filepath, JSON.stringify(json));
        }

        return null;
    }

    static fileExists(filepath: string): boolean {
        if (fs.existsSync(filepath)) {
            return true;
        }
        return false;
    }
}