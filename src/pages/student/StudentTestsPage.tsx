/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentHeader from "../../components/student/StudentHeader";
import { type Attempt, type TestItem } from "../../types/testing";

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
`;
const QuestionsList = styled.ol`
  display: grid;
  gap: 16px;
  padding-left: 20px;
  margin: 0;
`;

const QuestionCard = styled.li`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
`;

const QuestionText = styled.div`
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.35;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
`;

const OptionLabel = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;

const TextAnswer = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
`;

export default function StudentTestPage() {
  const { id } = useParams<{ id: string }>();
  const testId = Number(id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    if (Number.isNaN(testId) || testId <= 0) {
      setError("Неверный ID теста");
      setLoading(false);
      return;
    }

    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ошибка ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filteredQuestions = data.filter((q: any) => q.testId === testId);
        setQuestions(filteredQuestions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [testId]);

  const handleCheckboxChange = (qId: number, optionIdx: number) => {
    setAnswers((prev) => {
      const prevSelected = prev[qId] || [];
      let newSelected;
      if (prevSelected.includes(optionIdx)) {
        newSelected = prevSelected.filter((i: number) => i !== optionIdx);
      } else {
        newSelected = [...prevSelected, optionIdx];
      }
      return { ...prev, [qId]: newSelected };
    });
  };

  const handleRadioChange = (qId: number, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleTextChange = (qId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  if (Number.isNaN(testId)) return <p>Неверный ID</p>;
  if (loading) return <p>Загрузка…</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (questions.length === 0) return <p>Вопросы не найдены</p>;

  return (
    <div>
      
<StudentHeader title="Заголовок" />

      <h2>Тест №{testId}</h2>
      <QuestionsList>
        {questions.map((q) => (
          <QuestionCard key={q.id}>
            
<QuestionText>{q.text}</QuestionText>


            {/* Множественный выбор (checkbox) */}
            {q.type === "multiple" && (
              <OptionsList>
                {(q.options ?? []).map((opt: string, idx: number) => (
                  <li key={idx}>
                    <OptionLabel>
                      <input
                        type="checkbox"
                        aria-label={`Вопрос ${q.id}: вариант ${idx + 1}`}
                        checked={Array.isArray(answers[q.id]) && answers[q.id].includes(idx)}
                        onChange={() => handleCheckboxChange(q.id, idx)}
                      />
                      <span>{opt}</span>
                    </OptionLabel>
                  </li>
                ))}
              </OptionsList>
            )}

            {/* Один выбор (radio) */}
            {q.type === "single" && (
              <OptionsList>
                {(q.options ?? []).map((opt: string, idx: number) => (
                  <li key={idx}>
                    <OptionLabel>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        aria-label={`Вопрос ${q.id}: вариант ${idx + 1}`}
                        checked={answers[q.id] === idx}
                        onChange={() => handleRadioChange(q.id, idx)}
                      />
                      <span>{opt}</span>
                    </OptionLabel>
                  </li>
                ))}
              </OptionsList>
            )}

            {/* Текстовый ответ */}
            {q.type === "text" && (
              <TextAnswer
                type="text"
                value={answers[q.id] ?? ""}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
                aria-label={`Вопрос ${q.id}: текстовый ответ`}
              />
            )}
          </QuestionCard>
        ))}
      </QuestionsList>
    </div>
  );
}
