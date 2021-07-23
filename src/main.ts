import * as core from '@actions/core';
import {SemanticVersion} from '../src/SemanticVersion';

async function run(): Promise<void> {
    try {
        const VERSION = core.getInput('VERSION');
        const INCREMENT_MAJOR =
            core.getInput('INCREMENT_MAJOR').toLowerCase() === 'true';
        const INCREMENT_MINOR =
            core.getInput('INCREMENT_MINOR').toLowerCase() === 'true';
        const INCREMENT_PATCH =
            core.getInput('INCREMENT_PATCH').toLowerCase() === 'true';
        const PRERELEASE = core.getInput('PRERELEASE');
        const META = core.getInput('META');

        const semanticVersion = new SemanticVersion().parse(VERSION);
        if (INCREMENT_MAJOR) {
            semanticVersion.major++;
            semanticVersion.minor = 0;
            semanticVersion.patch = 0;
        } else if (INCREMENT_MINOR) {
            semanticVersion.minor++;
            semanticVersion.patch = 0;
        } else if (INCREMENT_PATCH) {
            semanticVersion.patch++;
        }
        semanticVersion.prerelease = PRERELEASE;
        semanticVersion.meta = META;

        const tag = semanticVersion.tag;
        core.info(`version: ${tag}`);
        core.setOutput('version', tag);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
