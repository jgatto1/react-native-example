import { FlatList, Modal, View } from 'react-native';
import React, { createRef, useCallback, useState } from 'react';
import { usePostListScreenStyles } from './PostListScreen.styles';
import { Button, Card, Checkbox, Text } from 'components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Space } from 'components/Space/Space';
import { RadioButtons } from 'components/RadioButtons/RadioButtons';
import Icons from 'containers/Main/assets';
import { SocialFeed, SocialFeedProps, SocialFeedRef } from 'containers/Main/Home/SocialFeed/SocialFeed';

interface PostListScreenProps extends SocialFeedProps {
  newPostRoute: string;
}

export const PostListScreen: React.VFC<PostListScreenProps> = (props) => {
  const styles = usePostListScreenStyles();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [newestOnTop, setNewestOnTop] = useState(true);

  const [newestOnTopProp, setNewestOnTopProp] = useState(true);
  const [favProp, setFavProp] = useState(false);

  const socialFeedRef = createRef<SocialFeedRef>();

  const setSort = (value: number) => {
    setNewestOnTop(value === 0);
  };

  useFocusEffect(
    useCallback(() => {
      socialFeedRef.current?.fetchNews();
    }, [socialFeedRef])
  );

  const closeModal = () => {
    setModalVisible(false);
    setFavProp(favorites);
    setNewestOnTopProp(newestOnTop);
  };

  const posts = (
    <FlatList
      style={[modalVisible && styles.overlay]}
      data={[]}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <Space margin={12} />
          <View style={styles.buttonsContainer}>
            <Button
              style={[styles.newPostButton]}
              onPress={() => navigation.navigate(props.newPostRoute)}
              icon={<Icons.AddIcon width={22} height={22} style={styles.newPostIcon} />}>
              NEW POST
            </Button>
            <Button onPress={() => setModalVisible(true)}>FILTER</Button>
          </View>
          <Space margin={12} />
        </>
      }
      ListFooterComponent={
        <>
          <SocialFeed
            ref={socialFeedRef}
            place={props.place}
            favorites={favProp}
            newestTop={newestOnTopProp}
            onlyCohort={props.onlyCohort}
            hidePublic={true}
          />
        </>
      }
    />
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Card style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Button style={styles.modalCloseButton} noShadow onPress={() => setModalVisible(false)}>
                X
              </Button>
              <Text weight='bold' size={20}>
                Filters
              </Text>
            </View>
            <Space margin={15} />
            <Text weight='bold'>Sort by date</Text>
            <Space margin={5} />
            <RadioButtons
              initial={newestOnTop ? 0 : 1}
              onSelect={(value) => setSort(value)}
              items={[
                { label: 'Newest at top', value: 0 },
                { label: 'Oldest at top', value: 1 },
              ]}
            />
            <Space />
            <Text weight='bold'>Filter by favorites</Text>
            <Space margin={5} />
            <View style={styles.modalFavoritesContainer}>
              <Checkbox
                isChecked={favorites}
                // bounceFriction={100000}
                // size={25}
                // iconStyle={styles.modalFavoritesCheck}
                // fillColor={theme.main.palette.primary}
                onPress={(value) => setFavorites(!!value)}
              />
              <Text>Only show entries I marked favorite</Text>
            </View>
            <Space margin={12} />
            <Button onPress={() => closeModal()}>APPLY</Button>
          </Card>
        </View>
      </Modal>
      {posts}
    </View>
  );
};

export const ScrollViewWrapped: React.FC = ({ children }) => {
  return (
    <FlatList
      data={[1]}
      renderItem={() => {
        return <>{children}</>;
      }}
      keyExtractor={() => 'PostListScreen'}
    />
  );
};
