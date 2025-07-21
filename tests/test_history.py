import os
import json
import csv
import pytest
from refactoui.history import HistoryLogger


@pytest.fixture
def temp_db():
    db_path = "sqlite:///test_history.db"
    if os.path.exists("test_history.db"):
        os.remove("test_history.db")
    logger = HistoryLogger(db_path=db_path)
    try:
        yield db_path, logger
    finally:
        logger.engine.dispose()
        if os.path.exists("test_history.db"):
            os.remove("test_history.db")


def test_log_and_export_json(temp_db):
    db_path, logger = temp_db
    logger.log("test_action", "some details")
    out_path = "out.json"
    logger.export_json(out_path)
    with open(out_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    assert data[0]["action"] == "test_action"
    os.remove(out_path)


def test_log_and_export_csv(temp_db):
    db_path, logger = temp_db
    logger.log("csv_action", "csv details")
    out_path = "out.csv"
    logger.export_csv(out_path)
    with open(out_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    assert rows[0]["action"] == "csv_action"
    os.remove(out_path)
