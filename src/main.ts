import * as core from '@actions/core';
import {SemanticVersion} from '../src/SemanticVersion';

async function run(): Promise<void> {
    try {
        const version = core.getInput('version');
        const incrementMajor =
            core.getInput('increment_major').toLowerCase() === 'true';
        const incrementMinor =
            core.getInput('increment_minor').toLowerCase() === 'true';
        const incrementPatch =
            core.getInput('increment_patch').toLowerCase() === 'true';
        const prerelease = core.getInput('prerelease');
        const meta = core.getInput('meta');

        const semanticVersion = new SemanticVersion().parse(version);
        if (incrementMajor) {
            semanticVersion.major = semanticVersion.major + 1;
            semanticVersion.minor = 0;
            semanticVersion.patch = 0;
        } else if (incrementMinor) {
            semanticVersion.minor = semanticVersion.minor + 1;
            semanticVersion.patch = 0;
        } else if (incrementPatch) {
            semanticVersion.patch = semanticVersion.patch + 1;
        }
        semanticVersion.prerelease = prerelease;
        semanticVersion.meta = meta;

        const tag = semanticVersion.tag;
        core.info(`version: ${tag}`);
        core.setOutput('version', tag);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
