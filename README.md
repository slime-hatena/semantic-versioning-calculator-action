# semantic-versioning-calculator action

[![test.yml/badge](https://github.com/slime-hatena/semantic-versioning-calculator-action/actions/workflows/test.yml/badge.svg)](https://github.com/slime-hatena/semantic-versioning-calculator-action/actions/workflows/test.yml)

Increments the semantic version string action.

## Configuration

### Input

| Name              | Description                                                                                                                             | Default   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `version`         | (Required) Specify the current semantic version. It must be followed semantic versioning rule. For example: 0.2.5, 2.10.0-develop, etc. |           |
| `increment_major` | Set to "true" will increment major.                                                                                                     | `'false'` |
| `increment_minor` | Set to "true" will increment minor. If increment_major is true, it will be ignored.                                                     | `'false'` |
| `increment_patch` | Set to "true" will increment patch. If increment_major or INCREMENT_MINOR are true, it will be ignored.                                 | `'false'` |
| `prerelease`      | Set the value as a prerelease name if specified.                                                                                        | `''`      |
| `meta`            | Set the value as a meta name if specified.                                                                                              | `''`      |

### Output

| Name      | Description                         |
| --------- | ----------------------------------- |
| `version` | Calculated semantic version string. |

## Example

### Increment major

```yml
name: 'Increment major'
on:
  push:
    branches:
      - main
test:
  runs-on: ubuntu-latest
  steps:
    - uses: slime-hatena/semantic-versioning-calculator-action@main
      id: calc
      with:
        version: '1.2.3+develop'
        increment_major: 'true'
    - run: echo "${{steps.calc.outputs.version}}" # 2.0.0
```

### Increment minor

```yml
name: 'Increment minor'
on:
  push:
    branches:
      - main
test:
  runs-on: ubuntu-latest
  steps:
    - uses: slime-hatena/semantic-versioning-calculator-action@main
      id: calc
      with:
        version: '1.2.3+develop'
        increment_minor: 'true'
    - run: echo "${{steps.calc.outputs.version}}" # 1.3.0

```

### Increment patch

```yml
name: 'Increment patch'
on:
  push:
    branches:
      - main
test:
  runs-on: ubuntu-latest
  steps:
    - uses: slime-hatena/semantic-versioning-calculator-action@main
      id: calc
      with:
        version: '1.2.3+develop'
        increment_patch: 'true'
    - run: echo "${{steps.calc.outputs.version}}" # 1.2.4
```

### Set prerelease

```yml
name: 'Set prerelease'
on:
  push:
    branches:
      - main
test:
  runs-on: ubuntu-latest
  steps:
    - uses: slime-hatena/semantic-versioning-calculator-action@main
      id: calc
      with:
        version: '1.2.3+develop'
        prerelease: 'beta'
    - run: echo "${{steps.calc.outputs.version}}" # 1.2.3-beta
```

### Increment minor and Set meta

```yml
name: 'Set prerelease'
on:
  push:
    branches:
      - main
test:
  runs-on: ubuntu-latest
  steps:
    - uses: slime-hatena/semantic-versioning-calculator-action@main
      id: calc
      with:
        version: '1.2.3+develop'
        increment_minor: 'true'
        increment_patch: 'true' # ignored.
        prerelease: 'test'
    - run: echo "${{steps.calc.outputs.version}}" # 1.3.0+test
```

## Acknowledgements

- [actions/typescript-action](https://github.com/actions/typescript-action)
- [actions/javascript-action](https://github.com/actions/javascript-action)
