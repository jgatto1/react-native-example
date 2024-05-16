import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  LayoutChangeEvent,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLearnStyles } from './Learn.styles';
import { Button, Text, TextInput } from 'components';
import { useLearn } from 'containers/Main/Learn/Learn.context';
import { LearnCategory, LearnPostWithCategory } from 'model/backend/learn-post';
import { useNavigation } from '@react-navigation/native';
import { routeFor } from 'containers/Main/Learn/Learn.routes';
import { Space } from 'components/Space/Space';
import { SVG } from './assets';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { ModalWrapper } from 'components/Modal/v2/Modal';
import { showAlertIfNetworkError } from 'providers/error.alert';

export const Learn: React.VFC = () => {
  const styles = useLearnStyles();
  const navigation = useNavigation();
  const learn = useLearn();

  const [suggest, setSuggest] = useState<string>();
  const [sendingSuggestion, setSendingSuggestion] = useState(false);
  const [showCategory, setShowCategory] = useState<{ [id: number]: boolean }>({});

  const [animations, setAnimations] = useState<{ [id: number]: Animated.Value }>({});

  useEffect(() => {
    const categoriesAnimations = learn.content.reduce(
      (acc, { category }) => ({ ...acc, [category.id]: new Animated.Value(0) }),
      {}
    );
    setAnimations(categoriesAnimations);
  }, [learn]);

  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const goTo = (post: LearnPostWithCategory) => {
    navigation.navigate(routeFor(post));
  };

  const closeModal = () => {
    setSuggest(undefined);
    setShowSuggestionModal(false);
  };

  const sendSuggest = () => {
    setSendingSuggestion(true);
    const data = { type: 'learn_topic', text: suggest };
    BackendClient.post<Res>('/suggestion/create', data)
      .then(validateResponse)
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot suggest learn topic', err);
      })
      .finally(() => {
        setSendingSuggestion(false);
        closeModal();
      });
  };

  const toggleCategory = (category: LearnCategory) => () => {
    const expanded = showCategory[category.id] || false;
    const animation = animations[category.id];
    if (animation) {
      animation.setValue(expanded ? 500 : 0);
      Animated.timing(animation, { duration: 1000, toValue: expanded ? 0 : 500, useNativeDriver: false }).start(); //Step 5
    }
    setShowCategory({ ...showCategory, [category.id]: !expanded });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <Modal visible={showSuggestionModal} animationType='slide' transparent={false}>
          <ModalWrapper onClose={() => closeModal()}>
            <Text bold>Suggest a new Learn article</Text>
            <Space margin={10} />
            <Text italic>
              Is there a topic you want to learn more about? Request a new article from our friendly and knowledgeable
              Seeking Safety team.
            </Text>
            <Space />
            <TextInput
              placeholder="Describe what you'd like to learn.."
              multiline
              style={styles.suggestInput}
              onChangeText={(s) => setSuggest(s)}
            />
            <Space />
            <View style={styles.suggestButtonContainer}>
              <Button
                loading={sendingSuggestion}
                disabled={!suggest || suggest.length < 1}
                onPress={() => sendSuggest()}>
                SEND
              </Button>
            </View>
          </ModalWrapper>
        </Modal>
        <ScrollView style={styles.root}>
          <Image resizeMode={'contain'} style={styles.image} source={require('./assets/learn-crop.png')} />

          <Space margin={10} />
          {learn.loading && <ActivityIndicator color='grey' />}
          {learn.content.map(({ category, posts }) => (
            <View key={category.id}>
              <Pressable style={styles.category} onPress={toggleCategory(category)}>
                <Text weight={'500'} size={16}>
                  {category.name}
                </Text>
                {!showCategory[category.id] && (
                  <SVG.More
                    width={20}
                    height={20}
                    style={styles.categoryExpandSVG}
                    fill={styles.categoryExpandSVG.color}
                  />
                )}
                {showCategory[category.id] && (
                  <SVG.Less
                    width={20}
                    height={20}
                    style={styles.categoryExpandSVG}
                    fill={styles.categoryExpandSVG.color}
                  />
                )}
              </Pressable>
              <AnimatedList show={showCategory[category.id] || false}>
                {posts.map((post) => (
                  <View key={`${category.id}-${post.id}`}>
                    <Pressable style={styles.post} onPress={() => goTo(post)}>
                      <Space horizontal margin={6} />
                      <Text style={styles.postText}>{post.subcategory}</Text>
                      {!!learn.reflections[post.id] && (
                        <SVG.Asterisk
                          // @ts-ignore
                          style={styles.postAsterisk}
                          width={10}
                          height={10}
                          fill={styles.asteriskSVG.color}
                        />
                      )}
                      <SVG.Open style={styles.postOpen} width={20} height={20} fill={styles.postOpen.color} />
                    </Pressable>
                  </View>
                ))}
              </AnimatedList>
              <Space />
            </View>
          ))}
          <Space margin={15} />
          <Text>What else interests you?</Text>
          <Space margin={3} />
          <Pressable style={styles.suggestButton} onPress={() => setShowSuggestionModal(true)}>
            <Text weight={'500'} size={16}>
              {'     '}Suggest a new article!
            </Text>
          </Pressable>
          <Space margin={15} />
        </ScrollView>
      </>
    </TouchableWithoutFeedback>
  );
};

interface AnimatedListProps {
  show?: boolean;
}

const AnimatedList: React.FC<AnimatedListProps> = ({ children, show }) => {
  const [animation] = useState(new Animated.Value(0));
  const [height, setHeight] = useState<number>(500);
  const [animatedViewHeight, setAnimatedViewHeight] = useState(0);
  const [actualTiming, setActualTiming] = useState<Animated.CompositeAnimation>();

  useEffect(() => {
    actualTiming?.stop();
    animation.setValue(animatedViewHeight);
    const composite = Animated.timing(animation, {
      delay: 10,
      duration: 200,
      toValue: show ? height : 0,
      useNativeDriver: false,
    });
    composite.start();
    setActualTiming(composite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onLayout = (e: LayoutChangeEvent) => {
    if (e.nativeEvent.layout.height === 0) {
      return;
    }
    setHeight(e.nativeEvent.layout.height);
  };

  const initialStyle = !actualTiming && { height: 0 };

  return (
    <Animated.View
      onLayout={(e) => setAnimatedViewHeight(e.nativeEvent.layout.height)}
      style={[initialStyle, { overflow: 'hidden', maxHeight: animation }]}>
      <View onLayout={(e) => onLayout(e)}>{children}</View>
    </Animated.View>
  );
};
