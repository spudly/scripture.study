import {Handler} from 'express';
import qs from 'querystring';
import fetch from 'node-fetch';
import {
  GoogleAccessTokenData,
  GoogleUserInfo,
  UserWithRoles,
} from '../../types';
import {
  findOrCreateOrUpdateGoogleUser,
  getUserRolesById,
} from '../api.postgres';
import sanitizeAuthRedirectUrl from '../../utils/sanitizeAuthRedirectUrl';
import {logger} from '../../utils/logger';

const {
  GOOGLE_OAUTH_CLIENT_ID = '',
  GOOGLE_OAUTH_CLIENT_SECRET = '',
  GOOGLE_OAUTH_CALLBACK_URL = '',
} = process.env;

const buildGoogleLoginUrl = () =>
  `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
    client_id: GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: GOOGLE_OAUTH_CALLBACK_URL,
    scope: ['profile', 'email'].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })}`;

const fetchAccessTokenData = async (
  code: string,
): Promise<GoogleAccessTokenData> => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: GOOGLE_OAUTH_CALLBACK_URL,
      grant_type: 'authorization_code',
      code,
    }),
  });
  if (!response.ok) {
    throw new Error(`Token Verification Failed: ${response.status}`);
  }
  const data: GoogleAccessTokenData = await response.json();
  return data;
};

export const fetchUserProfile = async (
  token: string,
): Promise<GoogleUserInfo> => {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`failed to get user info: ${response.status}`);
  }
  const profile = await response.json();
  return profile;
};

export const googleLoginMiddleware: Handler = (req, resp) => {
  const {authRedirectUrl = req.session!.authRedirectUrl ?? '/'} = req.query;
  req.session!.authRedirectUrl = sanitizeAuthRedirectUrl(authRedirectUrl);
  resp.redirect(buildGoogleLoginUrl());
};

export const googleCallbackMiddleware: Handler = async (req, resp) => {
  const tokenData = await fetchAccessTokenData(req.query.code as string);
  const profile = await fetchUserProfile(tokenData.access_token);
  const user = await findOrCreateOrUpdateGoogleUser(profile);
  const roles = await getUserRolesById(user.id);
  const userWithRoles: UserWithRoles = {
    ...user,
    roles: roles.map((r) => r.name),
  };

  const authRedirectUrl = req.session?.authRedirectUrl ?? '/';

  await new Promise((resolve, reject) => {
    req.session!.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  req.session!.user = userWithRoles;
  logger.info({user: user.name, sessionId: req.session!.id}, 'Logged In');
  resp.redirect(authRedirectUrl);
};

export const logout: Handler = async (req, resp) => {
  let {authRedirectUrl = req.session!.authRedirectUrl ?? '/'} = req.query;
  const user = req.session?.user;
  authRedirectUrl = sanitizeAuthRedirectUrl(authRedirectUrl);

  await new Promise((resolve, reject) => {
    req.session!.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  if (user) {
    logger.info({user: user.name}, 'Logged Out');
  } else {
    logger.info("Wasn't logged in");
  }

  resp.redirect(authRedirectUrl);
};
