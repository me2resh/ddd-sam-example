import json
import shortuuid  # External library
from src.bootstrap.initialize_patient_appointments import initialize_patient_appointments
from src.application.user_service import UserService

def lambda_handler(event, context):
    try:
        patient_id = event.get('pathParameters', {}).get('patientId')
        if not patient_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Patient ID is missing"}),
            }

        user_service = UserService()
        if not user_service.user_exists(patient_id):
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "Patient not found"}),
            }

        appointment_service = initialize_patient_appointments()
        appointments = appointment_service.get_appointments_by_patient_id(patient_id)

        # Generate a UUID for the response
        response_id = shortuuid.uuid()

        return {
            "statusCode": 200,
            "body": json.dumps({
                "responseId": response_id,
                "appointments": [appointment.to_dict() for appointment in appointments],
            }),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": str(e)}),
        }
