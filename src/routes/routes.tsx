import DefaultLayout from '@/components/layout/default/default-layout';
import { AuthGuard } from '@/components/route-guards/auth';
import { LogoutGuard } from '@/components/route-guards/logout';
import Loading from '@/components/ui/loading';
import CreateQuestionPage from '@/pages/create-question/views/create-question-page';
import HomePage from '@/pages/home-page/views/home-page';
import LoginPage from '@/pages/login/views/login-page';
import NotFound from '@/pages/not-found/not-found';
import QuestionPage from '@/pages/question-page/views/question-page';
import RegistrationPage from '@/pages/registration/views/registration-page';
import MyProfile from '@/pages/user-profile/views/my-profile-page';
import UserProfile from '@/pages/user-profile/views/user-profile-page';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route
            path='/'
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route path='home' element={<HomePage />} />
          <Route
            path='login'
            element={
              <AuthGuard>
                <LoginPage />
              </AuthGuard>
            }
          />
          <Route
            path='register'
            element={
              <AuthGuard>
                <RegistrationPage />
              </AuthGuard>
            }
          />
          <Route
            path='profile'
            element={
              <LogoutGuard>
                <MyProfile />
              </LogoutGuard>
            }
          />
          <Route path='profile/:userId' element={<UserProfile />} />
          <Route
            path='createQuestion'
            element={
              <LogoutGuard>
                <CreateQuestionPage />
              </LogoutGuard>
            }
          />
          <Route
            path='question/:id'
            element={
              <Suspense fallback={<Loading />}>
                <QuestionPage />
              </Suspense>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
