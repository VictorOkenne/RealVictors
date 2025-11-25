import { router } from 'expo-router';
import { MainUserProfilePage } from '../../src/components/screens/UserProfilePage';

export default function ProfileScreen() {
  const handleBackPress = () => {
    router.back();
  };

  const handlePostPress = (_postId: string, postIndex: number) => {
    router.push({
      pathname: '/highlight-list',
      params: { initialPostIndex: postIndex, userId: '1' },
    });
  };

  return (
    <MainUserProfilePage
      onBackPress={handleBackPress}
      onPostPress={handlePostPress}
    />
  );
}

