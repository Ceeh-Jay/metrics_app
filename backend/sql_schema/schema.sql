CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY,
    impressions INTEGER NOT NULL,
    clicks INTEGER NOT NULL,
    conversions INTEGER NOT NULL,
    spend REAL NOT NULL
);

CREATE TRIGGER enforce_campaigns_not_null BEFORE
INSERT ON campaigns BEGIN
SELECT CASE
    WHEN NEW.impressions IS NULL THEN RAISE(ABORT, 'Impressions cannot be null')
    WHEN NEW.clicks IS NULL THEN RAISE(ABORT, 'Clicks cannot be null')
    WHEN NEW.conversions IS NULL THEN RAISE(ABORT, 'Conversions cannot be null')
    WHEN NEW.spend IS NULL THEN RAISE(ABORT, 'Spend cannot be null')
END;
END;
