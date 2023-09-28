/*
var user_pref = function(pref, val){ //android only code, for usage with mobile devices
  try{
    if(typeof val == "string"){
         Services.prefs.setStringPref(pref, val);      
    }
    else if(typeof val == "number"){
         Services.prefs.setIntPref(pref, val);      
    }
    else if(typeof val == "boolean"){
         Services.prefs.setBoolPref(pref, val);      
    }
  } catch(e){
    console.log("pref:" + pref + " val:" + val + " e:" + e);
  }
} 
***/

/* 0000: disable about:config warning ***/
user_pref("general.warnOnAboutConfig", false); // for the XUL version
user_pref("browser.aboutConfig.showWarning", false); // for the new HTML version 

/* 0001: start Firefox in PB (Private Browsing) mode
 * [SETTING] Privacy & Security>History>Custom Settings>Always use private browsing mode
 * [SETTING-ESR52] Privacy>History>Custom Settings>Always use private browsing mode
 * [NOTE] In this mode *all* windows are "private windows" and the PB mode icon is not displayed
 * [NOTE] The P in PB mode is misleading: it means no "persistent" local storage of history,
 * caches, searches or cookies (which you can achieve in normal mode). In fact, it limits or
 * removes the ability to control these, and you need to quit Firefox to clear them. PB is best
 * used as a one off window (File>New Private Window) to provide a temporary self-contained
 * new instance. Closing all Private Windows clears all traces. Repeat as required.
 * [WARNING] PB does not allow indexedDB which breaks many Extensions that use it
 * including uBlock Origin, uMatrix, Violentmonkey and Stylus
 * [1] https://wiki.mozilla.org/Private_Browsing ***/
   // user_pref("browser.privatebrowsing.autostart", true);

/*** 0100: STARTUP ***/
/* 0101: disable default browser check
 * [SETTING] General>Startup>Always check if Firefox is your default browser ***/
user_pref("browser.shell.checkDefaultBrowser", false);
/* 0102: set start page (0=blank, 1=home, 2=last visited page, 3=resume previous session)
 * [SETTING] General>Startup>When Firefox starts ***/
   // user_pref("browser.startup.page", 0);
/* 0103: set your "home" page (see 0102) ***/
   // user_pref("browser.startup.homepage", "https://www.example.com/");

/*** 0200: GEOLOCATION ***/
/* 0201: disable Location-Aware Browsing
 * [1] https://www.mozilla.org/firefox/geolocation/ ***/
   // user_pref("geo.enabled", false);
/* 0201b: set a default permission for Location (FF58+)
 * [SETTING] to add site exceptions: Page Info>Permissions>Access Your Location
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Location>Settings ***/
user_pref("permissions.default.geo", 2); // 0=always ask (default), 1=allow, 2=block
user_pref("geo.enabled", false); // 0=always ask (default), 1=allow, 2=block
/* 0202: disable GeoIP-based search results
 * [NOTE] May not be hidden if Firefox has changed your settings due to your locale
 * [1] https://trac.torproject.org/projects/tor/ticket/16254
 * [2] https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_geolocation-for-default-search-engine ***/
user_pref("browser.search.countryCode", "US"); // (hidden pref)
user_pref("browser.search.region", "US"); // (hidden pref)
user_pref("browser.search.geoip.url", "");
/* 0205: set OS & APP locale (FF59+)
 * If set to empty, the OS locales are used. If not set at all, default locale is used ***/
user_pref("intl.locale.requested", "en-US"); // (hidden pref)
/* 0206: disable geographically specific results/search engines e.g. "browser.search.*.US"
 * i.e. ignore all of Mozilla's various search engines in multiple locales ***/
user_pref("browser.search.geoSpecificDefaults", false);
user_pref("browser.search.geoSpecificDefaults.url", "");
/* 0207: set language to match ***/
user_pref("intl.accept_languages", "en-US, en");
/* 0208: enforce US English locale regardless of the system locale
 * [1] https://bugzilla.mozilla.org/867501 ***/
user_pref("javascript.use_us_english_locale", true); // (hidden pref)
/* 0209: use APP locale over OS locale in regional preferences (FF56+)
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1379420,1364789 ***/
user_pref("intl.regional_prefs.use_os_locales", false);
/* 0210: use Mozilla geolocation service instead of Google when geolocation is enabled
 * Optionally enable logging to the console (defaults to false) ***/
user_pref("geo.wifi.uri", "");
user_pref("messaging-system.rsexperimentloader.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.asrouterfeed", false);

user_pref("geo.wifi.logging.enabled", false); // (hidden pref)

/*** 0300: QUIET FOX
     We choose to not disable auto-CHECKs (0301's) but to disable auto-INSTALLs (0302's).
     There are many legitimate reasons to turn off auto-INSTALLS, including hijacked or
     monetized extensions, time constraints, legacy issues, and fear of breakage/bugs.
     It is still important to do updates for security reasons, please do so manually. ***/
user_pref("app.update.enabled", false);
user_pref("extensions.update.enabled", false);
user_pref("extensions.systemAddon.update.enabled", false);
user_pref("app.update.auto", false);
user_pref("app.update.autodownload", "never"); //Android only
user_pref("extensions.update.autoUpdateDefault", false);
user_pref("app.update.service.enabled", false);
user_pref("app.update.staging.enabled", false);
user_pref("app.update.silent", false);
user_pref("extensions.getAddons.cache.enabled", false);
user_pref("lightweightThemes.update.enabled", false);
user_pref("browser.search.update", false);
user_pref("dom.ipc.plugins.flash.subprocess.crashreporter.enabled", false);
user_pref("dom.ipc.plugins.reportCrashURL", false);
user_pref("extensions.getAddons.showPane", false); // hidden pref
user_pref("extensions.webservice.discoverURL", "");
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.pioneer-new-studies-available", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE] above FF58+
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.cachedClientID", "");
user_pref("toolkit.telemetry.newProfilePing.enabled", false); // (FF55+)
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // (FF55+)
user_pref("toolkit.telemetry.updatePing.enabled", false); // (FF56+)
user_pref("toolkit.telemetry.bhrPing.enabled", false); // (FF57+) Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // (FF57+)
user_pref("toolkit.telemetry.hybridContent.enabled", false); // (FF59+)
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // (FF51+)
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit", false); // (FF51-57)
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // (FF58+)
user_pref("browser.newtab.preload", true);
user_pref("browser.newtabpage.enabled", true);
user_pref("home.sync.updateMode", "0"); //Android only
user_pref("home.sync.checkIntervalSecs", "0"); //Android only
user_pref("browser.snippets.firstrunHomepage.enabled", false); //Android only
user_pref("browser.snippets.enabled", false); //Android only
user_pref("browser.snippets.countryCode", "US"); //Android only
user_pref("browser.snippets.geoUrl", "data:,"); //Android only
user_pref("browser.snippets.statsUrl", "data:,"); //Android only
user_pref("browser.snippets.updateUrl", "data:,"); //Android only
user_pref("browser.snippets.updateInterval", 0); //Android only
user_pref("browser.aboutHomeSnippets.updateUrl", "data:,");
user_pref("browser.chrome.errorReporter.enabled", false);
user_pref("browser.chrome.errorReporter.submitUrl", "");
user_pref("browser.newtabpage.activity-stream.telemetry.structuredIngestion", false);
user_pref("browser.newtabpage.activity-stream.telemetry.structuredIngestion.endpoint", "data:,");
user_pref("browser.newtabpage.activity-stream.default.sites", "https://www.google.com/,https://www.youtube.com/,https://www.messenger.com/,https://www.twitter.com/,https://www.gmail.com/,https://wikipedia.org/,https://reddit.com/,https://reddit.com/,https://reddit.com/,https://reddit.com/,https://reddit.com/,https://reddit.com/,https://reddit.com/,https://reddit.com/,https://reddit.com/" );
user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
user_pref("browser.newtabpage.activity-stream.tippyTop.service.endpoint", "data:,");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry.ping.endpoint", "");
user_pref("browser.newtabpage.activity-stream.disableSnippets", true);
user_pref("browser.newtabpage.activity-stream.asrouter.snippetsUrl", );
user_pref("browser.newtabpage.activity-stream.filterAdult", false);
user_pref("browser.newtabpage.activity-stream.feeds.migration", false);
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);
user_pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "{}"); 
user_pref("browser.newtabpage.activity-stream.feeds.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories.options", "" );
user_pref("browser.newtabpage.activity-stream.feeds.favicon", false);
user_pref("browser.newtabpage.activity-stream.feeds.messagecenterfeed", false); // FF61+
user_pref("browser.newtabpage.activity-stream.feeds.systemtick", false);
user_pref("browser.newtabpage.activity-stream.feeds.theme", false); // FF61+
user_pref("browser.newtabpage.activity-stream.messageCenterExperimentEnabled", false); // FF61+
user_pref("browser.newtabpage.activity-stream.migrationExpired", true);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.telemetry.ut.events", false);
user_pref("browser.ping-centre.production.endpoint", "data:,");
user_pref("browser.ping-centre.staging.endpoint", "data:,");
user_pref("extensions.legacy.enabled", true);
user_pref("accessibility.typeaheadfind", false);
//Firefox beta only
user_pref("network.trr.mode", 5);
user_pref("network.trr.uri", "");
user_pref("network.trr.bootstrapAddress", "");
user_pref("extensions.fxmonitor.enabled", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false); 
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false); 
user_pref("layout.css.scrollbar-colors.enabled", true);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.urlbar.quicksuggest.dataCollection.enabled", false);
user_pref("browser.urlbar.quicksuggest.scenario", "offline");
user_pref("browser.urlbar.quicksuggest.remoteSettings.enabled", false);
user_pref("browser.urlbar.merino.endpointURL", "data:,");
user_pref("browser.newtabpage.activity-stream.feeds.recommendationprovider", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("extensions.recommendations.privacyPolicyUrl", "data:,");
user_pref("extensions.recommendations.themeRecommendationUrl", "data:,");

/*** 0400: BLOCKLISTS / SAFE BROWSING / TRACKING PROTECTION
     This section has security & tracking protection implications vs privacy concerns vs effectiveness
     vs 3rd party 'censorship'. We DO NOT advocate no protection. If you disable Tracking Protection (TP)
     and/or Safe Browsing (SB), then SECTION 0400 REQUIRES YOU HAVE uBLOCK ORIGIN INSTALLED.

     Safe Browsing is designed to protect users from malicious sites. Tracking Protection is designed
     to lessen the impact of third parties on websites to reduce tracking and to speed up your browsing.
     These do rely on 3rd parties (Google for SB and Disconnect for TP), but many steps, which are
     continually being improved, have been taken to preserve privacy. Disable at your own risk.
***/
user_pref("extensions.blocklist.enabled", false);
user_pref("extensions.blocklist.itemURL", ""); //Android only
user_pref("extensions.blocklist.url", "");
user_pref("services.blocklist.update_enabled", false);
//user_pref("services.blocklist.signing.enforced", false);
user_pref("services.blocklist.onecrl.collection", "");
user_pref("services.blocklist.addons.collection", "");
user_pref("services.blocklist.plugins.collection", "");
user_pref("services.blocklist.gfx.collection", "");
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false); // (FF50+)
user_pref("browser.safebrowsing.downloads.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous", false); // (FF49+)
user_pref("browser.safebrowsing.downloads.remote.block_dangerous_host", false); // (FF49+)
user_pref("browser.safebrowsing.provider.google.updateURL", "");
user_pref("browser.safebrowsing.provider.google.gethashURL", "");
user_pref("browser.safebrowsing.provider.google4.updateURL", ""); // (FF50+)
user_pref("browser.safebrowsing.provider.google4.gethashURL", ""); // (FF50+)
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");
user_pref("browser.safebrowsing.provider.google.reportURL", "");
user_pref("browser.safebrowsing.reportPhishURL", "");
user_pref("browser.safebrowsing.provider.google4.reportURL", ""); // (FF50+)
user_pref("browser.safebrowsing.provider.google.reportMalwareMistakeURL", ""); // (FF54+)
user_pref("browser.safebrowsing.provider.google.reportPhishMistakeURL", ""); // (FF54+)
user_pref("browser.safebrowsing.provider.google4.reportMalwareMistakeURL", ""); // (FF54+)
user_pref("browser.safebrowsing.provider.google4.reportPhishMistakeURL", ""); // (FF54+)
user_pref("browser.safebrowsing.provider.google4.dataSharing.enabled", false);
user_pref("browser.safebrowsing.provider.google4.dataSharingURL", "");
user_pref("privacy.trackingprotection.pbmode.enabled", false); // default: true
user_pref("privacy.trackingprotection.enabled", false);
user_pref("privacy.trackingprotection.ui.enabled", false);
user_pref("browser.safebrowsing.blockedURIs.enabled", false);
user_pref("browser.safebrowsing.provider.mozilla.gethashURL", "");
user_pref("browser.safebrowsing.provider.mozilla.updateURL", "");
user_pref("privacy.trackingprotection.annotate_channels", false);
user_pref("privacy.trackingprotection.lower_network_priority", false);
user_pref("experiments.enabled", false);
user_pref("experiments.manifest.uri", "");
user_pref("experiments.supported", false);
user_pref("experiments.activeExperiment", false);
user_pref("network.allow-experiments", false);
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("shield.savant.enabled", false);
user_pref("browser.ping-centre.telemetry", false);
user_pref("extensions.pocket.enabled", false);
user_pref("extensions.pocket.api", "data:," );
user_pref("extensions.pocket.oAuthConsumerKey", "00000-A00A000A0A0A0000A0A00AA0" );
user_pref("browser.library.activity-stream.enabled", false); // (FF57+)
user_pref("extensions.screenshots.disabled", false);
user_pref("extensions.screenshots.upload-disabled", true); // (FF60+)
user_pref("browser.onboarding.enabled", false);
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.available", "off"); // (FF56+)
user_pref("extensions.formautofill.creditCards.available", false); // [FF57+]
user_pref("extensions.formautofill.creditCards.enabled", false); // (FF56+)
user_pref("extensions.formautofill.heuristics.enabled", false);
user_pref("extensions.webcompat-reporter.enabled", false);
user_pref("network.prefetch-next", false);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.dns.disablePrefetchFromHTTPS", true); // (hidden pref)
user_pref("network.predictor.enabled", false);
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // (FF52+)
user_pref("network.http.speculative-parallel-limit", 0);
user_pref("browser.send_pings", false);
user_pref("browser.send_pings.require_same_host", true);
user_pref("network.protocol-handler.external.ms-windows-store", false);
user_pref("network.predictor.enable-prefetch", false);
user_pref("network.http.spdy.enabled", false);
user_pref("network.http.spdy.enabled.deps", false);
user_pref("network.http.spdy.enabled.http2", false);
user_pref("network.http.altsvc.enabled", false);
user_pref("network.http.altsvc.oe", false);
user_pref("network.proxy.socks_remote_dns", true);
user_pref("network.proxy.autoconfig_url.include_path", false); // default: false
user_pref("network.ftp.enabled", true);
 user_pref("network.file.disable_unc_paths", true); // (hidden pref) 
user_pref("keyword.enabled", true);
user_pref("browser.fixup.alternate.enabled", false);
user_pref("browser.urlbar.trimURLs", false);
user_pref("browser.sessionhistory.max_entries", 10);
user_pref("layout.css.visited_links_enabled", false);
user_pref("browser.urlbar.filter.javascript", true);
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.urlbar.suggest.searches", true);
user_pref("browser.urlbar.userMadeSearchSuggestionsChoice", true); // (FF41+)
user_pref("browser.urlbar.usepreloadedtopurls.enabled", false);
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.urlbar.suggest.history", false);
user_pref("browser.urlbar.suggest.bookmark", false);
user_pref("browser.urlbar.suggest.openpage", false);
user_pref("browser.urlbar.autoFill", false);
user_pref("browser.urlbar.autoFill.typed", false);
user_pref("browser.urlbar.oneOffSearches", false);
user_pref("browser.urlbar.maxHistoricalSearchSuggestions", 0); // max. number of search suggestions
user_pref("browser.formfill.enable", false);
user_pref("browser.taskbar.lists.enabled", false);
user_pref("browser.taskbar.lists.frequent.enabled", false);
user_pref("browser.taskbar.lists.recent.enabled", false);
user_pref("browser.taskbar.lists.tasks.enabled", false);
user_pref("browser.taskbar.previews.enable", false);
user_pref("security.tls.version.min", 1);
user_pref("security.tls.version.fallback-limit", 3);
user_pref("security.tls.version.max", 4); // 4 = allow up to and including TLS 1.3
user_pref("security.ssl.disable_session_identifiers", true); // (hidden pref)
user_pref("security.ssl.errorReporting.automatic", false);
user_pref("security.ssl.errorReporting.enabled", false);
user_pref("security.ssl.errorReporting.url", "");
user_pref("security.tls.enable_0rtt_data", false); // (FF55+ default true)
user_pref("security.ssl.enable_ocsp_stapling", false);
user_pref("security.OCSP.enabled", 0);
user_pref("security.OCSP.require", false);
user_pref("security.family_safety.mode", 0);
user_pref("security.cert_pinning.enforcement_level", 2);
user_pref("security.mixed_content.block_active_content", false);
user_pref("security.mixed_content.block_display_content", false);
//user_pref("network.http.sendRefererHeader", 2);
//user_pref("network.http.referer.trimmingPolicy", 0);
//user_pref("network.http.referer.XOriginPolicy", 0); //fix for bitwarden
//user_pref("network.http.referer.XOriginTrimmingPolicy", 0);
user_pref("network.http.referer.XOriginPolicy", 2); 
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);
user_pref("browser.urlbar.suggest.engines", false);
user_pref("network.http.referer.spoofSource", false);
user_pref("network.http.referer.defaultPolicy", 3); // (FF59+) default: 3
user_pref("network.http.referer.defaultPolicy.pbmode", 2); // (FF59+) default: 2
user_pref("network.http.referer.hideOnionSource", true);
user_pref("privacy.donottrackheader.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.usercontext.about_newtab_segregation.enabled", true);
user_pref("privacy.userContext.longPressBehavior", 2);
user_pref("plugin.default.state", 1);
user_pref("plugin.defaultXpi.state", 1);
user_pref("plugins.click_to_play", true);
user_pref("plugin.sessionPermissionNow.intervalInMinutes", 0);
user_pref("plugin.state.flash", 1);
user_pref("plugin.state.java", 1);
user_pref("plugin.scan.plid.all", false);
user_pref("media.gmp-provider.enabled", true);
user_pref("media.gmp.trial-create.enabled", true);
user_pref("media.gmp-manager.url", "data:text/plain,");
user_pref("media.gmp-manager.url.override", "data:text/plain,"); // (hidden pref)
user_pref("media.gmp-manager.updateEnabled", false); // disable local fallback (hidden pref)
user_pref("media.gmp-widevinecdm.visible", false);
user_pref("media.gmp-widevinecdm.enabled", false);
user_pref("media.gmp-widevinecdm.autoupdate", false);
user_pref("media.eme.enabled", false);
user_pref("browser.eme.ui.enabled", false);
user_pref("media.gmp-gmpopenh264.enabled", true); // (hidden pref)
user_pref("media.gmp-gmpopenh264.autoupdate", false);
user_pref("media.peerconnection.ice.default_address_only", true); // (FF42-FF50)
user_pref("media.peerconnection.ice.no_host", true); // (FF51+)
user_pref("media.getusermedia.screensharing.enabled", false);
user_pref("media.getusermedia.browser.enabled", false);
user_pref("media.getusermedia.audiocapture.enabled", false);
user_pref("media.autoplay.enabled", true);
user_pref("media.block-autoplay-until-in-foreground", true);
user_pref("network.gio.supported-protocols", ""); // (hidden pref) 
user_pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]
user_pref("dom.block_download_insecure", false);


/*** 2300: WEB WORKERS [SETUP]
     A worker is a JS "background task" running in a global context, i.e. it is different from
     the current window. Workers can spawn new workers (must be the same origin & scheme),
     including service and shared workers. Shared workers can be utilized by multiple scripts and
     communicate between browsing contexts (windows/tabs/iframes) and can even control your cache.

     [WARNING] Disabling workers *will* break sites (e.g. Google Street View, Twitter).
     [UPDATE] uMatrix 1.2.0+ allows a per-scope control for workers (2301-deprecated) and service workers (2302)
              #Required reading [#] https://github.com/gorhill/uMatrix/releases/tag/1.2.0

     [1]    Web Workers: https://developer.mozilla.org/docs/Web/API/Web_Workers_API
     [2]         Worker: https://developer.mozilla.org/docs/Web/API/Worker
     [3] Service Worker: https://developer.mozilla.org/docs/Web/API/Service_Worker_API
     [4]   SharedWorker: https://developer.mozilla.org/docs/Web/API/SharedWorker
     [5]   ChromeWorker: https://developer.mozilla.org/docs/Web/API/ChromeWorker
     [6]  Notifications: https://support.mozilla.org/questions/1165867#answer-981820
 ***/
user_pref("dom.serviceWorkers.enabled", true);
user_pref("dom.webnotifications.enabled", true); // (FF22+)
user_pref("dom.webnotifications.serviceworker.enabled", true); // (FF44+)
user_pref("dom.push.enabled", false);
user_pref("dom.push.connection.enabled", false);
user_pref("dom.push.serverURL", "");
user_pref("dom.push.userAgentID", "");
/* 2426: disable Intersection Observer API (FF53+)
 * Almost a year to complete, three versions late to stable (as default false),
 * number #1 cause of crashes in nightly numerous times, and is (primarily) an
 * ad network API for "ad viewability checks" down to a pixel level (BREAKS NEVER ENDING REDDIT)
 * [1] https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API
 * [2] https://w3c.github.io/IntersectionObserver/
 * [3] https://bugzilla.mozilla.org/1243846 ***/
user_pref("dom.IntersectionObserver.enabled", true);
user_pref("accessibility.force_disabled", 1);
user_pref("beacon.enabled", false);
user_pref("browser.helperApps.deleteTempFileOnExit", false);
user_pref("browser.pagethumbnails.capturing_disabled", true); // (hidden pref)
user_pref("browser.uitour.enabled", false);
user_pref("browser.uitour.url", "");
user_pref("browser.messaging-system.whatsNewPanel.enabled", false);
user_pref("devtools.chrome.enabled", false);
user_pref("devtools.webide.autoinstallADBHelper", false);
user_pref("devtools.debugger.remote-enabled", false);
user_pref("devtools.webide.enabled", false);
user_pref("network.http.redirection-limit", 20);
user_pref("webchannel.allowObject.urlWhitelist", "");
user_pref("network.IDN_show_punycode", true);
user_pref("pdfjs.disabled", false);
user_pref("extensions.webextensions.keepStorageOnUninstall", true);
user_pref("extensions.webextensions.keepUuidOnUninstall", false);
user_pref("extensions.webextensions.restrictedDomains", "");
user_pref("xpinstall.whitelist.required", true);
user_pref("security.csp.enable", true); // default: true
user_pref("security.csp.enable_violation_events", false);
user_pref("security.csp.experimentalEnabled", true);
user_pref("security.dialog_enable_delay", 0); // default: 1000 (milliseconds)
user_pref("dom.targetBlankNoOpener.enabled", true); // [DEFAULT: true FF79+]
user_pref("browser.startup.homepage_override.mstone", "ignore"); // master switch
user_pref("startup.homepage_welcome_url", "");
 user_pref("startup.homepage_welcome_url.additional", "");
user_pref("startup.homepage_override_url", ""); // What's New page after updates
user_pref("browser.tabs.warnOnClose", false);
user_pref("browser.tabs.warnOnCloseOtherTabs", false);
user_pref("browser.download.autohideButton", false); // (FF57+)
user_pref("toolkit.cosmeticAnimations.enabled", false); // (FF55+)
user_pref("browser.urlbar.decodeURLsOnCopy", true); // see  Bugzilla 1320061 (FF53+)
user_pref("reader.parse-on-load.enabled", true); // "Reader View"
user_pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)
user_pref("app.feedback.baseURL", "data:,");
user_pref("extensions.update.url", "https://versioncheck.addons.mozilla.org/update/VersionCheck.php?reqVersion=%REQ_VERSION%&id=%ITEM_ID%&version=%ITEM_VERSION%&maxAppVersion=%ITEM_MAXAPPVERSION%&status=%ITEM_STATUS%&appID=%APP_ID%&appVersion=%APP_VERSION%&appOS=%APP_OS%&appABI=%APP_ABI%&locale=%APP_LOCALE%&currentAppVersion=%CURRENT_APP_VERSION%&updateType=%UPDATE_TYPE%&compatMode=%COMPATIBILITY_MODE%");
user_pref("extensions.update.background.url", "data:,");
user_pref("extensions.systemAddon.update.url", "data:,");
user_pref("browser.newtabpage.activity-stream.migrationExpired", true);
user_pref("mail.provider.enabled", false);
user_pref("mail.provider.suggestFromName", "data:,");
user_pref("mail.provider.providerList", "data:,");
user_pref("mail.instrumentation.postUrl", "data:,");
user_pref("mail.cloud_files.inserted_urls.footer.link", "data:,");
user_pref("mail.cloud_files.enabled", false);
user_pref("mail.instrumentation.postUrl", "data:,");
user_pref("plugins.crash.supportUrl", "data:,");
user_pref("pfs.datasource.url", "data:,");
user_pref("devtools.devedition.promo.url", "data:,");
user_pref("mailnews.start_page.enabled", false);
user_pref("mailnews.start_page.url", "data:,");
user_pref("mailnews.start_page.override_url", "data:,");
user_pref("mailnews.mx_service_url", "data:,");
user_pref("mailnews.start_page_override.mstone", "ignore");
user_pref("privacy.window.name.update.enabled", true); 
user_pref("extensions.postDownloadThirdPartyPrompt", false); 
user_pref("extensions.abuseReport.amWebAPI.enabled", false);
user_pref("extensions.abuseReport.enabled", false);
user_pref("extensions.abuseReport.url", "data:,");
user_pref("extensions.blocklist.addonItemURL", "data:,");
user_pref("extensions.blocklist.detailsURL", "data:,");
user_pref("extensions.blocklist.itemURL", "data:,");
user_pref("extensions.getAddons.compatOverides.url", "data:,");
user_pref("extensions.getAddons.get.url", "data:,");
user_pref("extensions.getAddons.recommended.url", "data:,");
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("extensions.getAddons.link.url", "data:,");
user_pref("extensions.getAddons.themes.browseURL", "data:,");
user_pref("extensions.webcompat-reporter.newIssueEndpoint", "data:,");
user_pref("media.decoder-doctor.new-issue-endpoint", "data:,");
user_pref("browser.newtabpage.activity-stream.discoverystream.endpoints", "data:,");
user_pref("browser.newtabpage.activity-stream.discoverystream.endpointSpocsClear", "data:,");
user_pref("browser.newtabpage.activity-stream.discoverystream.config", "data:,");
/* 2701: disable 3rd-party cookies and site-data [SETUP-WEB]
 * 0=Accept cookies and site data, 1=(Block) All third-party cookies, 2=(Block) All cookies,
 * 3=(Block) Cookies from unvisited websites, 4=(Block) Cross-site and social media trackers (FF63+) (default FF69+)
 * [NOTE] You can set exceptions under site permissions or use an extension
 * [NOTE] Enforcing category to custom ensures ETP related prefs are always honored
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Custom>Cookies ***/
//user_pref("network.cookie.cookieBehavior", 1);
user_pref("browser.contentblocking.category", "custom");
/* 2702: set third-party cookies (i.e ALL) (if enabled, see 2701) to session-only
   and (FF58+) set third-party non-secure (i.e HTTP) cookies to session-only
   [NOTE] .sessionOnly overrides .nonsecureSessionOnly except when .sessionOnly=false and
   .nonsecureSessionOnly=true. This allows you to keep HTTPS cookies, but session-only HTTP ones
 * [1] https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/ ***/
user_pref("network.cookie.thirdparty.sessionOnly", true);
user_pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]
/* 2703: delete cookies and site data on close
 * 0=keep until they expire (default), 2=keep until you close Firefox
 * [NOTE] The setting below is disabled (but not changed) if you block all cookies (2701 = 2)
 * [SETTING] Privacy & Security>Cookies and Site Data>Delete cookies and site data when Firefox is closed ***/
   // user_pref("network.cookie.lifetimePolicy", 2);
/* 2710: disable DOM (Document Object Model) Storage
 * [WARNING] This will break a LOT of sites' functionality AND extensions!
 * You are better off using an extension for more granular control ***/
   // user_pref("dom.storage.enabled", false);
/* 2720: enforce IndexedDB (IDB) as enabled
 * IDB is required for extensions and Firefox internals (even before FF63 in [1])
 * To control *website* IDB data, control allowing cookies and service workers, or use
 * Temporary Containers. To mitigate *website* IDB, FPI helps (4001), and/or sanitize
 * on close (Offline Website Data, see 2800) or on-demand (Ctrl-Shift-Del), or automatically
 * via an extension. Note that IDB currently cannot be sanitized by host.
 * [1] https://blog.mozilla.org/addons/2018/08/03/new-backend-for-storage-local-api/ ***/
user_pref("dom.indexedDB.enabled", true); // [DEFAULT: true]
/* 2730: disable offline cache ***/
user_pref("browser.cache.offline.enable", false);
user_pref("browser.cache.offline.storage.enable", false);
/* 2740: disable service worker cache and cache storage
 * [NOTE] We clear service worker cache on exiting Firefox (see 2803)
 * [1] https://w3c.github.io/ServiceWorker/#privacy ***/
   // user_pref("dom.caches.enabled", false);
/* 2750: disable Storage API [FF51+]
 * The API gives sites the ability to find out how much space they can use, how much
 * they are already using, and even control whether or not they need to be alerted
 * before the user agent disposes of site data in order to make room for other things.
 * [1] https://developer.mozilla.org/docs/Web/API/StorageManager
 * [2] https://developer.mozilla.org/docs/Web/API/Storage_API
 * [3] https://blog.mozilla.org/l10n/2017/03/07/firefox-l10n-report-aurora-54/ ***/
   // user_pref("dom.storageManager.enabled", false);
/* 2755: disable Storage Access API [FF65+]
 * [1] https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API ***/
   // user_pref("dom.storage_access.enabled", false);
user_pref("security.remote_settings.crlite_filters.enabled", false);
user_pref("security.pki.crlite_mode", 0);
user_pref("dom.security.https_only_mode", false); // [FF76+] 
user_pref("offline-apps.allow_by_default", false);
user_pref("devtools.webide.autoinstallADBExtension", false); // [FF64+]
user_pref("browser.region.network.url", ""); // [FF78+]
user_pref("browser.region.update.enabled", false); // [[FF79+]
user_pref("browser.search.region", "US");
user_pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0); 

// ** Theme Related Options ****************************************************
// userchrome.css usercontent.css activate
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Fill SVG Color
user_pref("svg.context-properties.content.enabled", true);

user_pref("widget.non-native-theme.enabled", false);

// CSS Blur Filter - 88 Above
//user_pref("layout.css.backdrop-filter.enabled", true);

// Restore Compact Mode - 89 Above
user_pref("browser.compactmode.show", true);

user_pref("security.secure_connection_icon_color_gray", false); 


// ** Useful Options ***********************************************************
// Integrated calculator at urlbar
user_pref("browser.urlbar.suggest.calculator", true);

// Firefox Accounts
user_pref("identity.fxaccounts.enabled", false);
user_pref("identity.fxaccounts.commands.enabled", false);
user_pref("identity.fxaccounts.lastSignedInUserHash", "");
user_pref("identity.fxaccounts.pairing.enabled", false);
user_pref("identity.fxaccounts.auth.uri", "");
user_pref("browser.newtabpage.activity-stream.fxaccounts.endpoint", "");
user_pref("identity.fxaccounts.toolbar.enabled", false);
user_pref("identity.fxaccounts.toolbar.accessed", false);
user_pref("identity.fxaccounts.remote.oauth.uri", "");
user_pref("identity.fxaccounts.remote.pairing.uri", "");
user_pref("identity.fxaccounts.remote.root", "");
user_pref("identity.fxaccounts.service.monitorLoginUrl", "");

// Fingerprinting
user_pref("privacy.resistFingerprinting", true);

user_pref("browser.discovery.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("network.connectivity-service.enabled", false);
user_pref("browser.places.speculativeConnect.enabled", false);
user_pref("network.dns.skipTRR-when-parental-control-enabled", false);
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
user_pref("security.ssl.require_safe_negotiation", true);
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
user_pref("browser.xul.error_pages.expert_bad_cert", true);
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
user_pref("dom.disable_window_move_resize", true);
user_pref("permissions.manager.defaultsUrl", "");
user_pref("pdfjs.enableScripting", false); // [FF86+]
user_pref("permissions.delegation.enabled", false);
user_pref("browser.download.always_ask_before_handling_new_types", true);
user_pref("browser.download.manager.addToRecentDocs", false);
user_pref("extensions.enabledScopes", 5); // [HIDDEN PREF]
user_pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15]
user_pref("extensions.postDownloadThirdPartyPrompt", false);
user_pref("privacy.partition.serviceWorkers", true); // [DEFAULT: true FF105+]
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage", true); // [FF104+] [DEFAULT: true FF109+]
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage.exempt_sessionstorage", false); // [FF105+] [DEFAULT: false FF109+]
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF FF57-108]
user_pref("browser.display.use_system_colors", false); // [DEFAULT: false NON-WINDOWS]
user_pref("extensions.webcompat.enable_shims", false); // [DEFAULT: true]
user_pref("security.tls.version.enable-deprecated", false); // [DEFAULT: false]
user_pref("extensions.quarantinedDomains.enabled", false); // [DEFAULT: true]
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.messaging-system.whatsNewPanel.enabled", false);
user_pref("browser.urlbar.showSearchTerms.enabled", false);

