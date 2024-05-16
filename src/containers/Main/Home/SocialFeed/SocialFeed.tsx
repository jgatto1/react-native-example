import React, { useImperativeHandle, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SocialFeedPlace, SocialFeedService } from './SocialFeed.service';
import { PostCard } from './PostCard/PostCard';
import { PostCardProps } from './PostCard/model';
import { useSession } from 'providers/session/SessionProvider';

// import { useCommentSectionStyle } from './SocialFeed.style';

export interface SocialFeedProps {
  onlyCohort?: boolean;
  place?: SocialFeedPlace;
  favorites?: boolean;
  newestTop?: boolean;
  hidePublic?: boolean;
}

export interface SocialFeedRef {
  fetchNews: () => void;
  loadMore: () => void;
}

export const SocialFeed = React.forwardRef<SocialFeedRef, SocialFeedProps>((props, ref) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<PostCardProps[]>([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshingTop, setRefreshingTop] = useState(false);

  // use focus effect so that after updating a comment and going back the data will be updated on focused screen
  useFocusEffect(
    React.useCallback(() => {
      setOffset(1);
      setDataSource([]);
      getData(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.favorites, props.newestTop])
  );

  const fetchPost = (forceOffset?: number) =>
    SocialFeedService.getPosts(
      props.place || 'msp_posts',
      forceOffset || offset,
      props.favorites,
      props.newestTop,
      props.onlyCohort ? session.data?.user.cohort.id : undefined
    );

  const getData = (forceOffset?: number) => {
    if (!loading && !isListEnd) {
      setLoading(true);
      // Service to get the data from the server to render
      // Sending the correct offset with get request
      fetchPost(forceOffset)
        .then((response) => {
          // Successful response from the API Call
          if (response && response.length > 0) {
            setOffset((o) => o + 1);
            // After the response increasing the offset
            setDataSource((actual) => [...actual, ...response].filter((p) => (props.hidePublic ? !p.isPublic : true)));
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const refInit = (): SocialFeedRef => ({
    fetchNews: () => {
      if (offset === 1 || props.newestTop === false || refreshingTop) {
        return;
      }
      setRefreshingTop(true);
      const actualPosts = new Set(dataSource.map((p) => p.id));
      fetchPost(1)
        .then((res) => {
          const newPosts = res.filter((p) => !actualPosts.has(p.id));
          setDataSource((actual) => [...newPosts, ...actual].filter((p) => (props.hidePublic ? !p.isPublic : true)));
        })
        .catch((err) => {
          console.warn('Cannot fetch new posts', err);
        })
        .finally(() => setRefreshingTop(false));
    },
    loadMore: () => !refreshingTop && getData(),
  });

  useImperativeHandle(ref, refInit, [refInit]);

  /*const renderFooter = () => {
    return (
      // Footer View with Loader
      <View>
        {loading || refreshingTop ? <ActivityIndicator color='black' style={styles.footerIndicator} /> : null}
      </View>
    );
  };

  const ItemView = ({ item }: { index: number; item: PostCardProps }) => {
    return <PostCard showPrivateLabel={props.place === 'msp_posts'} {...item} />;
  };*/

  return (
    <View style={styles.root}>
      {refreshingTop ? <ActivityIndicator color='black' style={styles.footerIndicator} /> : <></>}
      {dataSource.map((post) => (
        <PostCard key={post.id} showPrivateLabel={props.place === 'msp_posts'} {...post} />
      ))}
      {/*<FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ListHeaderComponent={refreshingTop ? <ActivityIndicator color='black' style={styles.footerIndicator} /> : <></>}
        ListFooterComponent={renderFooter}
        onEndReached={() => getData()}
        onEndReachedThreshold={0.5}
      />*/}
      <View>
        {loading && !refreshingTop ? <ActivityIndicator color='black' style={styles.footerIndicator} /> : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  footerIndicator: {
    margin: 15,
  },
});
