import {FC, useEffect} from 'react';
import type {LocationListener} from 'history';
import {useHistory} from 'react-router-dom';

const GoogleAnalyticsUpdater: FC = () => {
  const history = useHistory();

  useEffect(() => {
    const callback: LocationListener = location => {
      if (!window.ga) {
        return;
      }
      ga('set', 'page', location.pathname);
      ga('send', 'pageview');
    };
    return history.listen(callback);
  }, [history]);

  return null;
};

export default GoogleAnalyticsUpdater;
