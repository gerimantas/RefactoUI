import json
import csv
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

Base = declarative_base()


class HistoryEntry(Base):
    __tablename__ = "history"
    id = Column(Integer, primary_key=True)
    action = Column(String(128))
    detail = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)


class HistoryLogger:
    def __init__(self, db_path="sqlite:///history.db"):
        self.engine = create_engine(db_path, echo=False, future=True)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def log(self, action, detail):
        session = self.Session()
        entry = HistoryEntry(action=action, detail=detail)
        session.add(entry)
        session.commit()
        session.close()

    def export_json(self, out_path):
        session = self.Session()
        entries = session.query(HistoryEntry).all()
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(
                [
                    {
                        "id": e.id,
                        "action": e.action,
                        "detail": e.detail,
                        "timestamp": e.timestamp.isoformat(),
                    }
                    for e in entries
                ],
                f,
                indent=2,
            )
        session.close()

    def export_csv(self, out_path):
        session = self.Session()
        entries = session.query(HistoryEntry).all()
        with open(out_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["id", "action", "detail", "timestamp"])
            for e in entries:
                writer.writerow([e.id, e.action, e.detail, e.timestamp.isoformat()])
        session.close()
