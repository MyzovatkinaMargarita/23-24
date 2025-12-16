import StudentHeader from '../../components/student/StudentHeader';
import { useState } from 'react';
import styled from 'styled-components';
import { LinkIcon } from '../../layouts/icons/icons';
import ChangePasswordModal from '../../components/student/ChangePasswordModal';
import Toast from '../../components/ui/Toast';

type GroupTag = { code: string; course: string; track: string };
type ProfileData = {
  fullName: string;
  nick?: string;
  avatarUrl?: string;
  social?: { label: string; url: string };
  groups: GroupTag[];
};

export default function StudentProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const [profile] = useState<ProfileData>({
    fullName: "Фильченко Диана Игоревна",
    nick: "код",
    avatarUrl:
      "https://images.unsplash.com/photo-1606335543042-57c525922933?q=80&w=640&auto=format&fit=facearea&facepad=3&h=640",
    social: { label: "vk.com/id565257045", url: "https://vk.com/id565257045" },
    groups: [
      { code: "КД18", course: "2 курс", track: "UX/UI" },
      { code: "КД18", course: "2 курс", track: "Frontend" },
    ],
  });

  function onChangePassword() {
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
  }

  function onPasswordChangeSuccess() {
    setIsModalOpen(false);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000);
  }

  return (
    <>
      <StudentHeader title="Профиль" />
      <Block>
        <div>
          <AvatarBox>
            {profile.avatarUrl && <img src={profile.avatarUrl} alt={profile.fullName} />}
          </AvatarBox>
        </div>
        <InfoCol>
          <NameRow>
            <FullName>{profile.fullName}</FullName>
            {profile.nick && <Badge>{profile.nick}</Badge>}
          </NameRow>
          {profile.social && (
            <LinkRow href={profile.social.url} target="_blank" rel="noreferrer">
              <LinkIcon />
              {profile.social.label}
            </LinkRow>
          )}
          <Groups>
            {profile.groups.map((g, i) => (
              <GroupLine key={`${g.code}-${i}`}>
                <span className="code">{g.code}</span>
                <Dot />
                <span className="muted">{g.course}</span>
                <Dot />
                <span className="muted">{g.track}</span>
              </GroupLine>
            ))}
          </Groups>
          <Actions>
            <Btn disabled>Поменять фото</Btn>
            <Btn onClick={onChangePassword}>Изменить пароль</Btn>
            <ChangePasswordModal
              open={isModalOpen}
              onClose={onCloseModal}
              onSuccess={onPasswordChangeSuccess}
            />
          </Actions>
        </InfoCol>
      </Block>

      <Toast
        open={toastOpen}
        message="Сохранения изменены"
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

// Ниже стили, можно дополнить или изменить по необходимости

const Block = styled.section`
  display: flex;
  gap: 30px;
  padding: 24px 0;
`;

const AvatarBox = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eaecf0;
  background: #fff;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoCol = styled.div`
  min-width: 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FullName = styled.h1`
  font-size: 28px;
  margin: 0;
`;

const Badge = styled.span`
  background-color: #e0e0e0;
  color: #333;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
`;

const LinkRow = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  color: #0077ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Groups = styled.div`
  margin-top: 20px;
`;

const GroupLine = styled.div`
  font-size: 16px;
  margin-bottom: 8px;

  .code {
    font-weight: 700;
  }
  .muted {
    color: #888;
  }
`;

const Dot = styled.span`
  margin: 0 6px;
  &:before {
    content: "•";
    color: #aaa;
  }
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
`;

const Btn = styled.button`
  padding: 10px 20px;
  background-color: #0077ff;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

