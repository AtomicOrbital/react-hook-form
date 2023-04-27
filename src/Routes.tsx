import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import LoginPageV2 from './modules/auth/pages/LoginPageV2';
import SignUpPage from './modules/auth/pages/SignUpPage';
import ConfirmCard from './modules/auth/components/ConfirmCard';
import TableComponent from '../src/modules/auth/components/ExerciseTable/TableComponent';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const DetailPage = lazy(() => import('./modules/auth/components/ExerciseTable/DetailPage/DetailPage'));
interface Props {}
export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        {/* <Route path={ROUTES.login} component={LoginPageV2} /> */}
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.signup} component={SignUpPage} />
        <Route path={ROUTES.card} component={ConfirmCard} />
        <Route path={ROUTES.table} component={TableComponent} />

        <Route path={`${ROUTES.detail}/:id`} component={DetailPage} />
        <ProtectedRoute  path={ROUTES.profile} component={DetailPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
