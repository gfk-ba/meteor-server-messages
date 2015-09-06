.PHONY: test publish

test:
	meteor test-packages --velocity --driver-package respondly:test-reporter ./

publish:
	meteor publish
