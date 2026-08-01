from datetime import datetime


def current_timestamp() -> str:
    """
    Returns current timestamp.
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")