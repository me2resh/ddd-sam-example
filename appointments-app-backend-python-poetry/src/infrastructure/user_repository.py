from abc import ABC, abstractmethod

class UserRepository(ABC):
    @abstractmethod
    def user_exists(self, user_id: str) -> bool:
        pass
