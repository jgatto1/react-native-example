import { HomeData } from 'providers/home/model';

class HomeServiceImpl {
  // Wont use this at the moment.
  getHomeData(): Promise<HomeData> {
    const data: HomeData = {
      posts: [],
      dailyActions: 'Addictions',
      weeklyTopics: 'Addictions',
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 2000);
    });
  }
}

export const HomeService = new HomeServiceImpl();
