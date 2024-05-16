import { useProfileFormSwiper } from 'containers/OnBoarding/ProfileFormSwiper/ProfileFormSwiper.styles';
import { Swiper, SwiperProps, Text } from 'components';
import React, { createRef, useState } from 'react';
import { ProfileFormInformation } from './Information/ProfileFormInformation';
import { ActivityIndicator, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ProfilePhoto } from './Photo/ProfilePhoto';
import { useProfileForm } from './context/ProfileFormContext';
import { ProfileFormGroupsContainer } from './Groups/ProfileFormGroups';
import { ProfileFormAbout } from './About/ProfileFormAbout';
import { ProfileFormPublic } from './PublicProfile/ProfileFormPublic';
import { SwiperRef } from 'components/Swiper/Swiper';
import { useSession } from 'providers/session/SessionProvider';
import { ProfileFormService } from 'containers/OnBoarding/ProfileFormSwiper/ProfileForm.service';
import { SessionData } from 'providers/session/model';

export const ProfileFormSwiper = () => {
  const form = useProfileForm();
  const session = useSession();
  const swiper = createRef<SwiperRef>();
  const [finishing, setFinishing] = useState(false);

  const finish = () => {
    const userId = session.data?.user.uuid;
    if (!userId) {
      console.warn('No user in session with uuid. Cannot update profile from onBoarding');
      return;
    }
    setFinishing(true);
    ProfileFormService.sendForm(userId, form)
      .then(({ user }) => {
        const sessionData: SessionData = { ...(session.data as SessionData), user };
        session.login(sessionData);
      })
      .catch((err) => console.error(err))
      .finally(() => setFinishing(false));
  };

  const swiperData: SwiperProps = {
    showPagination: true,
    onFinish: () => finish(),
    endButtonText: finishing ? <ActivityIndicator color={'white'} /> : undefined,
    enableNext: (currentPage) => {
      switch (currentPage) {
        case 0:
          return !!form?.info?.publicName;
        default:
          return true;
      }
    },
    data: [
      <Card title='Profile Information'>
        <ProfileFormInformation />
      </Card>,

      <Card title='Select a Profile Photo'>
        <ProfilePhoto />
      </Card>,

      <Card title='My Special Interest Groups'>
        <ProfileFormGroupsContainer />
      </Card>,

      <Card title='About Me'>
        <ProfileFormAbout />
      </Card>,

      <Card title='Public Profile'>
        <ProfileFormPublic goToEditProfile={() => swiper?.current?.goTo(0)} />
      </Card>,
    ],
  };

  return <Swiper ref={swiper} {...swiperData} />;
};

const CardIOS: React.FC<{ title: string }> = ({ title, children }) => {
  const styles = useProfileFormSwiper();

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.cardMain}>
        <View style={styles.cardContainer}>
          <View style={styles.childrenContainer}>{children}</View>
        </View>
      </View>
    </View>
  );
};

const CardAndroid: React.FC<{ title: string }> = ({ title, children }) => {
  const styles = useProfileFormSwiper();

  return (
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-80}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={[styles.cardMain, { flex: 10, minHeight: 500 }]}>
          <View style={styles.cardContainer}>
            <View style={[styles.childrenContainer]}>{children}</View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const Card: React.FC<{ title: string }> = Platform.OS === 'android' ? CardAndroid : CardIOS;
