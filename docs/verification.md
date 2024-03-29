Preamble for verification team from Twitch:

URL of the channel:
https://www.twitch.tv/danielduel

URL of repository:

> https://github.com/Duelsik/beatsaber-request-ui
> I am tagging versions, so if you want to review version x.y.z go to
> https://github.com/Duelsik/beatsaber-request-ui/tree/x.y.z
> like, when you are reviewing version 0.0.4 you can use
> https://github.com/Duelsik/beatsaber-request-ui/tree/0.0.4

After fetching code from the repo you can just `npm install && npm run build` in order to get
built extension :)

Also! You can get latest formatted version of this file on

> https://github.com/Duelsik/beatsaber-request-ui/blob/master/docs/verification.md

Table of contents:

- 0 - Changelog
- 1 - Motivation
- 2 - Main functions
  - 2a - Expand/Unexpand
  - 2b - Searching
- 3 - Code verification tips

0. Changelog

0.0.10:

- 4 September 2021
  - (tech) Clean info page boilerplate
  - (tech) Exclude UnexpandedApp as separate component and generalize wrapWith
- 5 September 2021
  - (tech) Refine typings
- 7 September 2021
  - (tech) Rewrite app start and replace rxjs with mostjs
- 13 October 2021
  - (feature) Add footer and ScoreSaber bar
  - (feature) Add ColorPicker to config page [@cutler7]
- 26 February 2022
  - (fix) Change CSP and BeatSaver endpoints to use api subdomain [@zaourzag]
  - (fix) Layout issue without footer
  - (fix) Remove delay from color picker input
- 27 February 2022

  - (feature) ScoreSaber integration

    0.0.9 (hotfix in the middle of 0.0.10 timeline):

- 6 February 2022

  - (docs) Add CSP policy document

    0.0.8:

- 13 August 2021
  - (docs) Bump up version
  - (feature) Ask user if they want to visit beatsaver page of map
- 21 August 2021
  - (feature) Redesign and refactor config page
  - (docs) Update documentation
- 1 September 2021

  - (fix) Redact config page
  - (feature) Tell the streamer that config is alright
  - (docs) Update docs
  - (feature) Reposition inactive bubble and fix rotations
  - (fix) Reposition close button and fix bubble ratios
  - (fix) Direct external links to \_blank
  - (tech) Clean build warns
  - (docs) Update twitch extension page
    Special thanks:
    Thanks to ttv/acerolavr for helping me with my bad english.

    0.0.7 (not published, failed to verify because TVT):

- 10 August 2021
  - (feature) Redesign result rows
  - (fix) Remove blue overlay onClick on webkits
  - (docs) Change version and remove rusher release notice
  - (tech) Cleanup code
  - (fix) Fix config-related bug and modify bubble behavior
- 11 August 2021
  - (feature) Upgrade image loading
  - (fix) Animate song list backgrounds and improve codestyle
- 12 August 2021

  - (fix) Fix pointer events on background image
  - (tech) Exclude close button as a component
  - (feature) Improve feeling of copy-pasting
  - (docs) Add translations
  - (docs) Update docs
    Special thanks:
    Thanks to ttv/acerolavr for spotting some bugs in this version.

    0.0.6: (already verified)

- 6 July 2021
  - (tech) Bump up version
  - (tech) Push tools directory to repo
- 7 July 2021
  - (tech) Reduce css and include @types/twitch-ext
- 8 July 2021
  - (tech) Rewrite LayoutRow
  - (tech) Move pages to pages folder and create BodyWithNavigation layout
  - (tech) Refactor app wrappers/containers
- 9 July 2021
  - (feature) Update infopage
- 10 July 2021
  - (feature) Improve and redesign search input
  - (fix) Style post-copy button on search item
  - (fix) Fix copy button dimensions with longer translations
  - (docs) Redesign base templates on figma
  - (feature) Redesign and improve code quality on search list item
  - (tech) Export SearchListItemDetails as a component
  - (feature) Show available difficulties per map
  - (fix) Fix overflow issue with difficulties
  - (fix) Fix wrapping issue on search item details
  - (tech) Exclude SearchListItem-related code as components
  - (fix) Redesign after reviewing viewports
- 11 July 2021
  - (tech) Refactor of SongItem and SongList to make app ready for more datasources
  - (feature) Add initial beatfollower integration
  - (feature) Improve beatfollower integration UI
  - (fix) Update ranked map list
- 23 July 2021
  - (feature) Redesign navigation bar
- 24 July 2021
  - (fix) Add pressed state on navigation items
  - (fix) Add config datasource and comment out 3rd party streamers
- 26 July 2021
  - (feature) Use pagination on resources
  - (docs) Update changelog
- 9 August 2021

  - (feature) Use new beatsaver api
  - (docs) Add information about rushed release
  - (fix) Fix pagination styling
  - (fix) Fix overflow issue on mobile

    0.0.5: (already verified)

- 24 May 2021
  - (feature) Add a language selector
  - (docs) Clean this (`verification.md`) file
- 31 May 2021
  - (docs) gitignore tools and add note about tagged versions
  - (feature) Add an option to use extension as a panel
  - (fix) Redesign clear button cross
- 2 June 2021
  - (docs) Add scripts and form cache to reduce work with sending code
- 3 June 2021
  - (feature) Don't render anything if stream category isn't BeatSaber (fullvideo-only)
- 4 June 2021

  - (feature) Make inactive bubble position configurable by the streamer
  - (dev) Configure proxies
  - (docs) Reformat verification doc to be nicely formatted (at least changelog section)
  - (fix) Fix api.twitch.tv calls
  - (fix) Fix bottom positioning to be left
  - (feature) Fetch ranked maps (local json) and mark ranked maps
  - (fix) Tweaks to the UI

    0.0.4:

- 14 May 2021
  - (fix) Hide autogenerated maps from search results
- 22 May 2021
  - Initialize internationalization
  - (fix) Change button style when hovering over search and copy button
  - Minor refactor of button feel
  - (tech) Stabilize return types
  - Add autofocus on searchbar input
  - Add clear button to searchbar input
- 23 May 2021

  - Update page meta

    0.0.3: (already verified)

- 26 March 2021:
  - Switch app to typescript
  - Use prettier
  - Use eslint
  - Don't offer automatically generated maps in the results (for now, will add optional checkbox in future)
  - Typed common response data from beatsaver
  - Don't render big panel at start, just a bubble with animation and a little tooltip
- 08 May 2021:

  - Finish codesplit to config, mobile and fullvideo extension (config and mobile are only for test)
  - Reformat project
  - Fix prettier config
  - Update docs about functions

    0.0.2: (already verified)

- 22 March 2021:

  - Replace "command" (cta) tooltip with the copy button
  - Fix partial-pixel component position glitches
  - Change extension name to "Beatsaber Request UI" (the extension page, not code)
  - Add sections in the header
  - Add Search section leading to the search
  - Add Info section leading to the information page (internal - with version and link to the repository)
  - Make search section to be open by default
  - Add information page with links to the extension page, this repo issue tracker, link leading to the repo and the actual version of this extension

    0.0.1: (already verified)

- 18 March 2021
  - Add expand/unexpand and searching functionality

1. Motivation

I've created this piece of software to make it easier to search for beatsaber maps
without opening another browser tabs or tutorials on how and where to get key for
map request.

So in short - it should make user life easier and serve as an easy-to-use tool.

2. Main functions

2a. Expand/Unexpand

(Fullvideo-only feature)
(App starts as non-expanded, because viewers this is something on the streamer side)
Users can hide and show the extension panel.

Hiding:
Click the cross icon in the top right segment of the extension.
The extension pane should hide.

Showing:
Click on the small bubble in top left part of the video.
The extension pane should appear.
(this also is resetting the state of deeper elements like Search state)

2b. Searching

Search is using https://beatsaver.com/ as a dataset and backend.

Users can search for maps using input and the "Search" button.
The extension is showing the result of the search as a list with different data fields.
Fields such as key <del>and "!bsr {key}" are</del> is magnified when hovering over
them to make copy-pasting easier.
Last field is a button which copies command to the clipboard to be pasted into the chat.
While searching - the extension should communicate that to the user.
In case of no results - the extension should communicate that to the user.

3. Code verification tips

Hi another developer.

Generally, this is an ejected react app.
I've ejected that because I had to inject twitch scripts and do changes to allow
testing it locally (and I think there were more problems, but I don't remember).
(And building config/mobile/fullvideo... as separate apps from one codebase)
