class SessionManager:

    _sessions = {}

    @classmethod
    def create(cls, state):
        cls._sessions[state["session_id"]] = state

    @classmethod
    def get(cls, session_id):
        return cls._sessions.get(session_id)

    @classmethod
    def update(cls, state):
        cls._sessions[state["session_id"]] = state

    @classmethod
    def delete(cls, session_id):
        cls._sessions.pop(session_id, None)