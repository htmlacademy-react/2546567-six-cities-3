import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
export default PrivateRoute;
