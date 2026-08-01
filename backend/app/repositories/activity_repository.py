from sqlalchemy.orm import Session

from app.models.activity import Activity


class ActivityRepository:

    @staticmethod
    def save(

        db: Session,

        activity: Activity

    ):

        db.add(activity)

        db.commit()

        db.refresh(activity)

        return activity