import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const useLastVisitedPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const getLastVisitedPage = async () => {
      try {
        const lastVisitedPage = await AsyncStorage.getItem('lastVisitedPage');
        if (lastVisitedPage) {
          navigation.navigate(lastVisitedPage);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLastVisitedPage();
  }, [navigation]);
};

export default useLastVisitedPage;
