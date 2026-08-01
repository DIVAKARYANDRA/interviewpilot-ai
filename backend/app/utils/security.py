from secrets import token_hex


def generate_session_id() -> str:
    """
    Generates unique session ID.
    """
    return token_hex(16)