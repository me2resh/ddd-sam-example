# Use the function logical IDs prefixed with 'build-'
build-PatientAppointmentFunction:
	# Activate the virtual environment and install dependencies
	poetry export -f requirements.txt --output requirements.txt --without-hashes
	pip install -r requirements.txt -t $(ARTIFACTS_DIR)
	cp -r src $(ARTIFACTS_DIR)
	rm requirements.txt

build-AnotherLambdaFunction:
	poetry export -f requirements.txt --output requirements.txt --without-hashes
	pip install -r requirements.txt -t $(ARTIFACTS_DIR)
	cp -r src $(ARTIFACTS_DIR)
	rm requirements.txt
