import {
  GestureResponderEvent,
  Keyboard,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useLearnPostStyles } from './LearnPost.styles';
import { Button, Text, TextInput } from 'components';
import { LearnPostReflection, LearnPostsReflectionRes, LearnPostWithCategory } from 'model/backend/learn-post';
import { Space } from 'components/Space/Space';
import { RenderHTML } from 'react-native-render-html';
import { useLearn } from 'containers/Main/Learn/Learn.context';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { ModalWrapper } from 'components/Modal/v2/Modal';
import { showAlertIfNetworkError } from 'providers/error.alert';

interface LearnPostProps {
  post: LearnPostWithCategory;
  reflections?: LearnPostReflection[];
}

const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
  ...(Platform.OS === 'android'
    ? { a: { onPress: (_a: GestureResponderEvent, href: string) => Linking.openURL(href) } }
    : {}),
};

export const LearnPost: React.VFC<LearnPostProps> = ({ post, reflections }) => {
  const styles = useLearnPostStyles();
  const dimension = useWindowDimensions();
  const learn = useLearn();

  const [showReflectionModal, setShowReflectionModal] = useState(false);

  const [lastReflection] = (reflections || []).slice().reverse();
  const [reflection, setReflection] = useState<string>(lastReflection?.text || '');

  const [postingReflection, setPostingReflection] = useState<'PUBLIC' | 'PRIVATE'>();

  const htmlFontStyles = ['body', 'span', 'label', 'a', 'p', 'div'].reduce(
    (acc, act) => ({ ...acc, [act]: styles.html }),
    {}
  );

  const closeModal = () => {
    setShowReflectionModal(false);
  };

  const createNote = (isPublic: boolean) => {
    const postData = {
      resource_data: reflection,
      is_public: isPublic,
      origin: 'Note To Self',
    };
    setPostingReflection(isPublic ? 'PUBLIC' : 'PRIVATE');
    BackendClient.post<LearnPostsReflectionRes>(`/learn_post/${post.id}/reflection/create`, { text: reflection })
      .then(validateResponse)
      .then(async (res) => {
        return {
          post: await BackendClient.post<Res>('/msp_post/create', postData).then(validateResponse),
          reflection: res.learn_post_reflection,
        };
      })
      .then((data) => learn.addReflection(post.id, data.reflection))
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(`Cannot create reflection on learn post ${post.id}`, err);
      })
      .finally(() => {
        setPostingReflection(undefined);
        closeModal();
      });
  };

  return (
    <View style={styles.root}>
      <Modal visible={showReflectionModal} animationType='slide' transparent={false}>
        <Pressable onPress={Keyboard.dismiss} style={{ height: '100%' }}>
          <ModalWrapper onClose={() => closeModal()}>
            <Text bold>My Notes</Text>
            <Space />
            <Text>Thoughts and reactions? Points to remember?</Text>
            <Space margin={10} />
            <TextInput
              autoFocus
              style={styles.reflectionInput}
              multiline
              placeholder='Write the note'
              value={reflection}
              onChangeText={(t) => setReflection(t)}
            />
            <Space />
            <View style={styles.reflectionButtons}>
              <Button
                loading={postingReflection === 'PRIVATE'}
                disabled={reflection?.length < 3 || !!postingReflection}
                horizontalButtonPadding={5}
                onPress={() => createNote(false)}>
                FOR ME
              </Button>
              <Space horizontal />
              <Button
                loading={postingReflection === 'PUBLIC'}
                disabled={reflection?.length < 3 || !!postingReflection}
                horizontalButtonPadding={5}
                onPress={() => createNote(true)}>
                SHARE
              </Button>
            </View>
          </ModalWrapper>
        </Pressable>
      </Modal>
      <ScrollView style={styles.content}>
        <Space margin={15} />
        <Text bold style={styles.title}>
          {post.category.name}
        </Text>
        <Space />
        <Text bold size={14}>
          {post.subcategory}
        </Text>
        <Space />
        <RenderHTML
          renderersProps={renderersProps}
          tagsStyles={htmlFontStyles}
          contentWidth={dimension.width}
          source={{ html: post.text }}
        />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerTitle}>
          <Text bold>Make it yours! In the space below list your notes for future reference.</Text>
        </View>
        <Space margin={5} />
        <Pressable style={styles.notePressable} onPress={() => setShowReflectionModal(true)}>
          <Text>{lastReflection?.text || 'Write your reflections...'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const buildLearnPostFor = (
  post: LearnPostWithCategory,
  reflections: LearnPostReflection[]
): React.ComponentType<any> => {
  return () => <LearnPost post={post} reflections={reflections} />;
};
