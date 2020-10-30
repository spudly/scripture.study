const sanitizeAuthRedirectUrl = (authRedirectUrl: unknown): string => {
  if (
    typeof authRedirectUrl !== 'string' ||
    !authRedirectUrl.startsWith('/') ||
    /[^a-z0-9./]/iu.test(authRedirectUrl)
  ) {
    return '/';
  }
  return authRedirectUrl;
};

export default sanitizeAuthRedirectUrl;
