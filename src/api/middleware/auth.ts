/* eslint-disable camelcase */
import qs from 'querystring';
import {Handler} from 'express';
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
    access_type: 'offline',
    client_id: GOOGLE_OAUTH_CLIENT_ID,
    prompt: 'consent',
    redirect_uri: GOOGLE_OAUTH_CALLBACK_URL,
    response_type: 'code',
    scope: ['profile', 'email'].join(' '),
  })}`;

const fetchAccessTokenData = async (
  code: string,
): Promise<GoogleAccessTokenData> => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    body: JSON.stringify({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_OAUTH_CALLBACK_URL,
    }),
    method: 'POST',
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
    roles: roles.map(r => r.name),
  };

  const authRedirectUrl = req.session?.authRedirectUrl ?? '/';

  await new Promise<void>((resolve, reject) => {
    req.session!.regenerate(error => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  req.session!.user = userWithRoles;
  logger.info({sessionId: req.session!.id, user: user.name}, 'Logged In');
  resp.redirect(authRedirectUrl);
};

export const logout: Handler = async (req, resp) => {
  let {authRedirectUrl = req.session!.authRedirectUrl ?? '/'} = req.query;
  const user = req.session?.user;
  authRedirectUrl = sanitizeAuthRedirectUrl(authRedirectUrl);

  await new Promise<void>((resolve, reject) => {
    req.session!.regenerate(error => {
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
