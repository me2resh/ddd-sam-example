from src.infrastructure.user_repository import UserRepository

class MockUserRepository(UserRepository):
    def __init__(self):
        self.users = {'user1', 'user2', 'user3'}

    def user_exists(self, user_id: str) -> bool:
        return user_id in self.users
