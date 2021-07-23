export class SemanticVersion {
    private _major = 0;
    private _minor = 0;
    private _patch = 0;
    private _prerelease = '';
    private _meta = '';

    get major(): number {
        return this._major;
    }

    set major(value: number) {
        this._major = value;
    }

    get minor(): number {
        return this._minor;
    }

    set minor(value: number) {
        this._minor = value;
    }

    get patch(): number {
        return this._patch;
    }

    set patch(value: number) {
        this._patch = value;
    }

    set prerelease(value: string) {
        this._prerelease = value;
    }

    set meta(value: string) {
        this._meta = value;
    }

    get tag(): string {
        if (this._prerelease !== '' && this._meta !== '') {
            return `${this._major}.${this._minor}.${this._patch}-${this._prerelease}+${this._meta}`;
        } else if (this._prerelease !== '' && this._meta === '') {
            return `${this._major}.${this._minor}.${this._patch}-${this._prerelease}`;
        } else if (this._prerelease === '' && this._meta !== '') {
            return `${this._major}.${this._minor}.${this._patch}+${this._meta}`;
        } else {
            return `${this._major}.${this._minor}.${this._patch}`;
        }
    }

    parse(versionString: string): SemanticVersion {
        if (toString.call(versionString) !== '[object String]') {
            throw new Error(
                `Argument 'versionString' must be [object String], but ${toString.call(
                    versionString
                )} specified.`
            );
        }

        if ((versionString.match(/\./g) || []).length !== 2) {
            throw new Error(
                `Wrong tag as semantic versioning. ${versionString}`
            );
        }

        const v = versionString.split('.');
        for (let i = 0; i <= 2; ++i) {
            let element = v[i];

            if (i === 2) {
                let hasPrerelease = element.includes('-');
                const hasMeta = element.includes('+');

                if (hasPrerelease && hasMeta) {
                    hasPrerelease = !element.match(/\+.*-/);
                }

                if (hasPrerelease && hasMeta) {
                    const m = element.split('+');
                    element = m[0];
                    this._meta = m[1];

                    const p = element.split('-');
                    element = p[0];
                    this._prerelease = p[1];
                } else if (hasMeta) {
                    const m = element.split('+');
                    element = m[0];
                    this._meta = m[1];
                } else if (hasPrerelease) {
                    const p = element.split('-');
                    element = p[0];
                    this._prerelease = p[1];
                }
            }

            const n = Number(element);
            if (Number.isNaN(n)) {
                throw new Error(
                    `${element} is not interpreted as an integer value. ${versionString}`
                );
            }

            if (i === 0) {
                this._major = n;
            } else if (i === 1) {
                this._minor = n;
            } else if (i === 2) {
                this._patch = n;
            }
        }

        return this;
    }
}
