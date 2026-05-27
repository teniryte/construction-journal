INSERT INTO "WorkType" ("name")
VALUES
    ('Кладка перегородок'),
    ('Монтаж опалубки'),
    ('Армирование'),
    ('Бетонирование')
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "WorkEntry" ("date", "workType", "volume", "unit", "executorName")
SELECT seed."date", seed."workType", seed."volume", seed."unit", seed."executorName"
FROM (
    VALUES
        ('2026-05-20'::date, 'Кладка перегородок', 24.5::double precision, 'м2', 'Иванов Сергей Петрович'),
        ('2026-05-21'::date, 'Монтаж опалубки', 18::double precision, 'м2', 'Петров Алексей Николаевич'),
        ('2026-05-22'::date, 'Армирование', 1.8::double precision, 'т', 'Сидоров Дмитрий Андреевич'),
        ('2026-05-23'::date, 'Бетонирование', 12::double precision, 'м3', 'Кузнецов Максим Игоревич')
) AS seed("date", "workType", "volume", "unit", "executorName")
WHERE NOT EXISTS (
    SELECT 1
    FROM "WorkEntry" entry
    WHERE entry."date" = seed."date"
      AND entry."workType" = seed."workType"
      AND entry."volume" = seed."volume"
      AND entry."unit" = seed."unit"
      AND entry."executorName" = seed."executorName"
);
