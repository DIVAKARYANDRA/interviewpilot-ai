from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.interview import Interview


def get_dashboard_stats(db: Session, user_id: int):

    completed = (
        db.query(Interview)
        .filter(
            Interview.user_id == user_id,
            Interview.status == "COMPLETED"
        )
    )

    total = completed.count()

    average = (
        completed.with_entities(
            func.avg(Interview.overall_score)
        ).scalar()
        or 0
    )

    best = (
        completed.with_entities(
            func.max(Interview.overall_score)
        ).scalar()
        or 0
    )

    recent = (
        completed
        .order_by(
            Interview.completed_at.desc()
        )
        .limit(5)
        .all()
    )

    return {

        "total_interviews": total,

        "average_score": round(average),

        "best_score": best,

        "recent_interviews": recent

    }