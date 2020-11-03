/* eslint-disable camelcase */
export type ManifestImageResource = {
  /**
   * Space-separated image dimensions.
   */
  sizes: string;

  /**
   * The path to the image file. If src is a relative URL, the base URL will
   * be the URL of the manifest.
   */
  src: string;

  /**
   * A hint as to the media type of the image. The purpose of this member is
   * to allow a user agent to quickly ignore images of media types it does not
   * support.
   */
  type?: string;

  /**
   * The purpose of the image, for example if the image is intended to
   * serve some special purpose in the context of the host OS (i.e., for
   * better integration).
   */
  purpose?: 'monochrome' | 'maskable' | 'any';
};

/**
 * Web App Manifests
 *
 * Provides information about a web application in JSON format. This information
 * is necessary for the web app to be downloaded and presented to the user
 * similarly to a native app (e.g., be installed on the homescreen of a device,
 * providing users with quicker access and a richer experience), and ensuring
 * discoverability.
 */
export type WebAppManifest = {
  /**
   * Defines a placeholder background color for the application page to display
   * before its stylesheet is loaded. This value is used by the user agent to
   * draw the background color of a shortcut when the manifest is available
   * before the stylesheet has loaded.
   *
   * Therefore background_color should match the background-color CSS property
   * in the site’s stylesheet for a smooth transition between launching the web
   * application and loading the site's content.
   */
  background_color?: string;

  /**
   * The names of categories that the application supposedly belongs to. There
   * is no standard list of possible values, but the W3C maintains a list of
   * known categories.
   */
  categories?: Array<string>;

  /**
   * What the application does
   */
  description?: string;

  /**
   * The base direction in which to display direction-capable members of the
   * manifest. Together with the lang member, it helps to correctly display
   * right-to-left languages.
   */
  dir?: 'ltr' | 'rtr' | 'auto';

  /**
   * Preferred display mode for the website.
   */
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';

  /**
   * The International Age Rating Coalition (IARC) certification code of the
   * web application. It is intended to be used to determine which ages the web
   * application is appropriate for.
   */
  iarc_rating_id?: string;

  /**
   * An array of objects representing image files that can serve as application
   * icons for different contexts. For example, they can be used to represent
   * the web application amongst a list of other applications, or to integrate
   * the web application with an OS's task switcher and/or system preferences.
   */
  icons: Array<ManifestImageResource>;

  /**
   * A string containing a single language tag. It specifies the primary
   * language for the values of the manifest's directionality-capable members,
   * and together with dir determines their directionality.
   */
  lang?: string;

  /**
   * The name of the web application as it is usually displayed to the user
   * (e.g., amongst a list of other applications, or as a label for an icon).
   */
  name: string;

  /**
   * The default orientation for all the website's top level browsing contexts.
   */
  orientation?:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary';

  /**
   * Specifies that applications listed in `related_applications` should be
   * preferred over the web application. If the `prefer_related_applications`
   * member is set to `true`, the user agent might suggest installing one of
   * the related applications instead of this web app.
   *
   * @default false
   */
  prefer_related_applications?: boolean;

  /**
   * An array of objects specifying native applications that are installable by,
   * or accessible to, the underlying platform — for example, a native Android
   * application obtainable through the Google Play Store. Such applications are
   * intended to be alternatives to the manifest's website that provides
   * similar/equivalent functionality — like the native app equivalent.
   */
  related_applications?: Array<{
    /**
     * The platform on which the application can be found. E.G. `itunes`, `play`
     */
    platform?: string;

    /**
     * The URL at which the application can be found.
     */
    url?: string;

    /**
     * The ID used to represent the application on the specified platform.
     */
    id?: string;
  }>;

  /**
   * Defines the navigation scope of this web application's application context.
   * It restricts what web pages can be viewed while the manifest is applied.
   * If the user navigates outside the scope, it reverts to a normal web page
   * inside a browser tab or window.
   *
   * If the scope is a relative URL, the base URL will be the URL of the
   * manifest.
   */
  scope?: string;

  /**
   * An array of screenshots intended to showcase the application. These
   * images are intended to be used by progressive web app stores.
   */
  screenshots?: Array<ManifestImageResource>;

  /**
   * The name of the web application displayed to the user if there is not
   * enough space to display name (e.g., as a label for an icon on the phone
   * home screen).
   */
  short_name?: string;

  /**
   * The start URL of the web application — the prefered URL that should be
   * loaded when the user launches the web application (e.g., when the user
   * taps on the web application's icon from a device's application menu or
   * homescreen).
   */
  start_url?: string;

  /**
   * The default theme color for the application. This sometimes affects how the
   * OS displays the site (e.g., on Android's task switcher, the theme color
   * surrounds the site).
   */
  theme_color: string;
};
