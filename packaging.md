To create a new release run

> npm version [ major | minor | patch ]

This will bump the version for the release. When running `npm version` a git
tag and commit will automatically be created and the `postversion` script in
`package.json` will automatically be called. This script automatically publish
the package and push the commit to github.
