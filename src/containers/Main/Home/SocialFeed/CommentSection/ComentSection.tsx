import { IconButton } from 'components/Button/Button';
import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { SocialFeedService } from '../SocialFeed.service';
import { PostCard } from '../PostCard/PostCard';
import { PostCardProps } from '../PostCard/model';
import { useCommentSectionStyle } from './CommentSection.styles';
import Icons from '../../../assets';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../Home.stack';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useSession } from 'providers/session/SessionProvider';

type CommentSectionProps = StackScreenProps<HomeStackParamList, 'comments'>;
export const CommentSection = ({ route }: CommentSectionProps) => {
  const { mainPost } = route.params;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<PostCardProps[]>([mainPost]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [text, setText] = useState('');
  const styles = useCommentSectionStyle();
  const theme = useTheme();
  const session = useSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), []);

  const getData = () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      // Service to get the data from the server to render
      // Sending the currect offset with get request
      SocialFeedService.getComments(mainPost.id, offset)
        .then((response) => {
          // Successful response from the API Call
          if (response && response.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...response]);
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

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? <ActivityIndicator color='black' style={styles.footerIndicator} /> : null}
      </View>
    );
  };

  const ItemView = ({ index, item }: { index: number; item: PostCardProps }) => {
    const isMainPost = index === 0;
    return <PostCard commentSection={true} isMainPost={isMainPost} {...item} />;
  };

  const submitComment = async () => {
    const res = await SocialFeedService.addComment(mainPost.id, text, session.userUUID);
    Keyboard.dismiss();
    if (res) {
      setDataSource((data) => [...data, res]);
    }
    setText('');
  };

  // TODO: at the moment to solve the issue of hiding the input we're using KeybaordsAvoidView
  // with a harcoded keyboardVerticalOffset value. And the current behavior may not be the best
  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'android' ? -190 : 90}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholderTextColor={theme.main.palette.other.login.placeholder}
            placeholder={'Tap to add comment'}
            onChangeText={(value) => setText(value)}
            value={text}
          />
          <IconButton style={styles.submitButton} onPress={submitComment}>
            <Icons.ArrowIcon width={18} height={15} />
          </IconButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
