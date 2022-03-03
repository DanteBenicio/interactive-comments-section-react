import { CommentProps } from '../../types/comment';
import {
  Container, Content, Image,
  ImageIcon,
  Minus, Plus, Score,
  ScoreWrapper, UserContent, UserCreatedAt,
  UserInfo, Username, Wrapper,
} from './styles';

export default function Comment({
  user, createdAt, content, score, replies,
}: CommentProps) {
  return (
    <>
    <Container>
      <Wrapper>
        <ScoreWrapper>
          <Plus>
            <ImageIcon src="assets/icon-plus.svg" alt="plus icon" />
          </Plus>
          <Score>{score}</Score>
          <Minus>
            <ImageIcon src="assets/icon-minus.svg" alt="minus icon" />
          </Minus>
        </ScoreWrapper>
        <Content>
          <UserInfo>
            <Image src={user.image.png} alt="userimage in circle" />
            <Username>{user.username}</Username>
            <UserCreatedAt>{createdAt}</UserCreatedAt>
          </UserInfo>
          <UserContent>{content}</UserContent>
        </Content>
      </Wrapper>
    </Container>
      {isReply && (
        <Container>
          <WrapperResponding>
            <UserAvatarIsResponding src={currentUser?.image.png} />
            <TextContent wrap="wrap" autoFocus ref={textareaRef} value={`@${user.username}`} />
            <ReplyButton>Reply</ReplyButton>
          </WrapperResponding>
        </Container>
      )}
    </>
  );
}
