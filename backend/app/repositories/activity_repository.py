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

    @staticmethod
    def get_all(

        db: Session,

        user_id: int

    ):

        return (

            db.query(Activity)

            .filter(Activity.user_id == user_id)

            .order_by(Activity.created_at.desc())

            .all()

        )