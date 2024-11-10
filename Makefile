install: deps-install lint-install
	npx simple-git-hooks

run:
	node gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

lint-install:
	npm install --save-dev eslint

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test lint install run
