import json
import shortuuid  # External library
from src.application.user_service import UserService

def lambda_handler(event, context):
    try:
        user_id = event.get('queryStringParameters', {}).get('userId')
        if not user_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "User ID is missing"}),
            }

        user_service = UserService()
        if not user_service.user_exists(user_id):
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "User not found"}),
            }

        # Generate a UUID for the response
        response_id = shortuuid.uuid()

        return {
            "statusCode": 200,
            "body": json.dumps({
                "responseId": response_id,
                "message": f"User {user_id} exists.",
            }),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": str(e)}),
        }
