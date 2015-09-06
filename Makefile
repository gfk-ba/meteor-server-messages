.PHONY: build test publish

README.coffee.md: build
	node_modules/mocha/bin/mocha --reporter spec --compilers coffee:coffee-script README.coffee.md

test:
	meteor test-packages --velocity --driver-package respondly:test-reporter ./

publish:
	meteor publish
