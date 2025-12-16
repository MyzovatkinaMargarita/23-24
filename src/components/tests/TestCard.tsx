import type { Attempt, TestItem } from "../../types/testing.ts";
type Props = {
  test: TestItem;
  lastAttempt?: Attempt | null;
};


function formatDateISO(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU");
}


function formatMinutesFromSec(sec?: number | null): string | null {
  if (sec === undefined || sec === null) return null;
  const m = Math.round(sec / 60);
  return `${m} минут`;
}



export default function TestCard({ test, lastAttempt }: Props) {
  return (
    <div className="test-card">
      <h3>{test.title}</h3>
      <p>{test.shortDescription}</p>
      <p>Длительность: {formatMinutesFromSec(test.durationSec) || "не указана"}</p>
      <p>Проект: {test.meta.project}</p>
      <p>Трек: {test.meta.track}</p>
      <p>Курс: {test.meta.course}</p>
      <p>Цель: {test.meta.purpose}</p>
      <p>Проходной балл: {test.passScore}</p>
      <p>Лимит попыток: {test.attemptsAllowed}</p>
      <p>Можно ли повторять: {test.allowRetry ? "Да" : "Нет"}</p>
      <p>Опубликован: {test.isPublished ? "Да" : "Нет"}</p>
      <p>Теги: {test.tags.join(", ")}</p>
      <p>Дедлайн: {formatDateISO(test.deadlineISO) || "не указан"}</p>
      {lastAttempt && (
        <p>
          Последняя попытка: {lastAttempt.status}, балл: {lastAttempt.score}
        </p>
      )}
    </div>
  );
}
