from src.infrastructure.mock_user_repository import MockUserRepository

class UserService:
    def __init__(self, user_repository=None):
        self.user_repository = user_repository or MockUserRepository()

    def user_exists(self, user_id: str) -> bool:
        return self.user_repository.user_exists(user_id)
