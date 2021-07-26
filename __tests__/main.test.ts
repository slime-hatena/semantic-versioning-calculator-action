import {SemanticVersion} from '../src/SemanticVersion';

let versions = [
    '1.0.0',
    '2.4.6',
    '50000.70000000.9000000000',
    '3.4.7-alpha',
    '2.0.4+develop',
    '7.0.1-beta+main',
    '6.0.5+version-3'
];

versions.forEach((element) => {
    test(`parse "${element}"`, async () => {
        expect(new SemanticVersion().parse(element).tag).toEqual(element);
    });
});
