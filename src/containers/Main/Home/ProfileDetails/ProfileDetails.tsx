import React, { useCallback, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'components';
import { useAvatarStyle, useCardStyle } from './ProfileDetails.styles';
import { useFocusEffect } from '@react-navigation/core';
import { ProfileDetailsService } from './ProfileDetails.service';
import { Settings } from 'model/backend/login';
import { InterestGroup } from 'model/backend/interest-group';
import { EMOJIS } from 'containers/OnBoarding/ProfileFormSwiper/About/assets';
import { HomeStackParamList } from '../Home.stack';

type ProfileDetailsProps = StackScreenProps<HomeStackParamList, 'profile-details'>;

const ProfileDetails = ({ navigation, route }: ProfileDetailsProps) => {
  const { userName, userId, imageUrl } = route.params;
  const [userData, setData] = useState<Settings | null>(null);
  const [userInterestGroupsData, setUserInterestGroups] = useState<InterestGroup[]>([]);
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: `${userName}'s Profile`,
        headerTitleAlign: 'center',
      });
      const fetchData = async () => {
        await Promise.all([
          ProfileDetailsService.fetchUserInfo(userId).then((data: Settings) => {
            setData(data);
          }),
          ProfileDetailsService.fetchUserInterestGroups(userId).then((response: InterestGroup[]) => {
            setUserInterestGroups(response);
          }),
        ]);
      };
      fetchData().catch(() => console.warn('Ignored User Info data'));
    }, [userName, navigation, userId])
  );
  return (
    <View style={useCardStyle.root}>
      <View style={useCardStyle.header}>
        <Avatar imageUrl={imageUrl} />
        <View style={useCardStyle.info}>
          <View style={useCardStyle.infoRow}>
            {!!userData && !!userData.emotional_status && (
              <Image style={useCardStyle.emotionalEmoji} source={EMOJIS[userData!.emotional_status]} />
            )}
            <Text style={useCardStyle.name}>{userName}</Text>
          </View>
          <View>{!!userData && <Text style={useCardStyle.about}>{userData?.about_me_short ?? ''}</Text>}</View>
        </View>
      </View>
      <View>
        <Text style={useCardStyle.aboutMeTitle}>{'More About Me'}</Text>
        <Text style={useCardStyle.aboutMeContent}>{userData?.about_me_long ?? ''}</Text>
      </View>
      <View>
        <Text style={useCardStyle.interestTitle}>{'Special Interest Groups'}</Text>
        <FlatList
          data={userInterestGroupsData}
          renderItem={({ item }) => <Item {...item} />}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const Avatar = ({ imageUrl }: any) => {
  const styles = useAvatarStyle();
  return (
    <View style={styles.container}>
      <Image style={styles.root} source={imageUrl} />
    </View>
  );
};

const Item = ({ name }: InterestGroup) => (
  <View style={useCardStyle.interestChip}>
    <Text style={useCardStyle.interestChipText}>{name}</Text>
  </View>
);

export default ProfileDetails;
