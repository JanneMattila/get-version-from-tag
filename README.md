# Get version from tag

Get version number from GitHub release tag which can
be used for e.g., versioning packages of your solution.

## Usage

Here's example full Release YAML you can use:

```yml
name: Release

on:
  release:
    types:
      - edited
      - released

jobs:
  Release:

    runs-on: ubuntu-latest

    steps:
    - id: get_version
      name: Get version
      uses: jannemattila/get-version-from-tag@v1

    - name: Display version
      run: |
        VERSION=$(echo "${{ steps.get_version.outputs.version }}")
        echo $VERSION
```

If you then create new GitHub Release with tag `0.0.1-demo.1`
then above `get_version` will provide output value `version`
which you can use in follow-up actions.
