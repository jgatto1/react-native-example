import React, { useState } from 'react';
import { Image, ImageURISource, Linking, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Space, Text } from 'components';
import { useAvatarStyle, useCardStyle } from './PostCard.styles';
import { PostCardProps } from './model';
import { HomeRoutes as Routes } from '../../Home.stack.routes';
import Icons from '../../../assets';
import { SocialFeedService } from '../SocialFeed.service';
import { BackendClient } from 'service/backend-client.service';
import { F, Res, validateResponse } from 'model/backend';
import { Post } from 'model/backend/social.feed';
import AvatarDefaultSVG from './assets/empty-avatar.svg';
import { TextFormatted } from 'components/Text/Styled/StyledText';
import { useSession } from 'providers/session/SessionProvider';
import { TextLink } from 'components/Text/TextLink';

/** TODO: the shortBio text can be [HIDDEN] for some users
 * need to know what to check for this
 */

interface PrivateLabel {
  showPrivateLabel?: boolean;
}

declare type Props = PostCardProps & PrivateLabel;

export const PostCardInner = ({ commentSection = false, isMainPost = true, ...props }: Props) => {
  const {
    id,
    name,
    shortBio,
    date,
    postOrigin,
    avatarImgUrl,
    image,
    postTextContent,
    favorite,
    commentCount,
    flagged,
    user,
    link,
    showPrivateLabel,
  } = props;
  const styles = useCardStyle();
  const navigation = useNavigation();
  const session = useSession();

  const [flag, setFlag] = useState<boolean>(flagged);
  const [fav, setFav] = useState<boolean>(!!favorite);
  const [isPublic, setIsPublic] = useState(props.isPublic);
  const [togglingPrivacy, setTogglingPrivacy] = useState(false);
  const isOwnComment = user === session.userUUID;
  const showFavAction = !commentSection || (commentSection && isMainPost);
  const postActionsStyle = () => {
    if (!commentSection) {
      return [styles.postFooter];
    }

    return showFavAction ? [styles.commentSection] : [styles.postFooterFavOnly];
  };

  const toggleFlag = () => {
    setFlag(!flag);
    SocialFeedService.toggleFlag(id, !flag);
  };

  const toggleFavorite = () => {
    setFav(!fav);
    SocialFeedService.toggleFavorite(id, !fav).catch((err) =>
      console.warn(`Cannot toggle favorite for post ${id}`, err)
    );
  };

  const togglePrivacy = () => {
    if (togglingPrivacy) {
      return;
    }
    setTogglingPrivacy(true);
    BackendClient.put<Res<F<'post', Post>>>(`/msp_post/${id}`, { is_public: !isPublic })
      .then(validateResponse)
      .then(() => setIsPublic((p) => !p))
      .catch((err) => {
        console.warn(`Cannot toggle privacy of post ${id}`, err);
      })
      .finally(() => setTogglingPrivacy(false));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Avatar
          imageUrl={
            isOwnComment
              ? session.data && session.data.user.settings.avatar_url_512
                ? { uri: session.data?.user.settings.avatar_url_512 }
                : undefined
              : avatarImgUrl
          }
          clickable={!commentSection}
          userId={user}
          userName={isOwnComment ? session.data?.user.settings.display_name : name}
        />
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Text style={styles.name}>{isOwnComment ? session.data?.user.settings.display_name : name}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Text style={styles.about}>{isOwnComment ? session.data?.user.settings.about_me_short : shortBio}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.postOrigin}>{postOrigin}</Text>
      </View>
      {showPrivateLabel && (
        <>
          <Space />
          <Text style={isPublic ? styles.public : styles.private}>{isPublic ? 'Public' : 'Private'}</Text>
        </>
      )}
      <View style={styles.postContent}>
        {image?.uri && (
          <Pressable
            style={styles.imgContainer}
            onPress={() => navigation.navigate(Routes.IMAGE_DETAIL, { imageUrl: image })}>
            <Image style={styles.image} source={image} />
          </Pressable>
        )}
        <TextFormatted size={15}>{`${postTextContent}`}</TextFormatted>
        {link && (
          <>
            <Space />
            <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
              <TextLink
                numberOfLines={1}
                onPress={() => Linking.openURL(link.startsWith('http') ? link : `https://${link}`)}>
                {link.startsWith('http') ? link : `https://${link}`}
              </TextLink>
            </View>
          </>
        )}
      </View>
      <View style={postActionsStyle()}>
        {showFavAction && (
          <Pressable style={styles.footerActions} onPress={() => toggleFavorite()}>
            {fav ? <Icons.StarFilledIcon /> : <Icons.StarIcon />}
            <Text style={styles.footerActionText}>Favorite</Text>
          </Pressable>
        )}
        {!commentSection && (
          <View style={props.showPrivateLabel && styles.commentsButton}>
            <Pressable
              style={[styles.footerActions, styles.commentsAction]}
              onPress={() =>
                navigation.navigate(Routes.COMMENTS, {
                  mainPost: props,
                })
              }>
              <Icons.CommentIcon />
              <Text style={styles.footerActionText}>Comments {!!commentCount && `(${commentCount})`}</Text>
            </Pressable>
            {props.showPrivateLabel && (
              <Button horizontalButtonPadding={5} loading={togglingPrivacy} onPress={() => togglePrivacy()}>
                {isPublic ? 'UNSHARE' : 'SHARE'}
              </Button>
            )}
          </View>
        )}
        {commentSection && !isOwnComment && (
          <Pressable style={[styles.footerActions]} onPress={() => toggleFlag()}>
            {flag ? <Icons.FlagActiveIcon /> : <Icons.FlagInactiveIcon />}
            <Text style={styles.footerActionText}>Flag</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

function propsAreEquals(prevProps: Readonly<Props>, nextProps: Readonly<Props>) {
  return (
    prevProps.commentCount === nextProps.commentCount &&
    prevProps.favorite !== nextProps.favorite &&
    prevProps.avatarImgUrl !== nextProps.avatarImgUrl &&
    prevProps.flagged !== nextProps.flagged
  );
}

export const PostCard = React.memo(PostCardInner, propsAreEquals);

interface AvatarProps {
  imageUrl?: ImageURISource;
  clickable?: boolean;
  userId?: string;
  userName?: string;
}

export const Avatar = ({ imageUrl, clickable = true, userId, userName }: AvatarProps) => {
  const [useDefault, setUseDefault] = useState(false);
  const styles = useAvatarStyle();
  const navigation = useNavigation();
  const onClick = clickable ? () => navigation.navigate(Routes.PROFILE_DETAILS, { imageUrl, userId, userName }) : null;
  return (
    <Pressable onPress={onClick}>
      {imageUrl && imageUrl.uri && !useDefault && (
        <Image
          style={styles.root}
          source={{ uri: imageUrl.uri }}
          onError={(err) => {
            console.warn(`Cannot fetch url avatar for user ${userId} ${userName}`, imageUrl, err);
            setUseDefault(true);
          }}
        />
      )}
      {(!imageUrl || !imageUrl.uri || useDefault) && <AvatarDefaultSVG width={48} height={48} />}
    </Pressable>
  );
};
