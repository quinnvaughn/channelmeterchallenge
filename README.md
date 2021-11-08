# Channel Meter Coding Challenge

Hi there! Here's my coding challenge.

It's a basic CRA project so all you have to do is run

### `npm install/yarn add`

### `npm start/yarn start`

Unfortunately didn't get enough time to add tests, so you won't have to run those, but it should work.

Instead of doing previous/next buttons, I just implemented react-beautiful-dnd, so you can drag things around. That's much more similar to how Trello actually works.

This project was very simple so my folder structure is pretty simple and maybe not what I'd do for a bigger project.

Normally I'd also style my own things used styled-components, but for the sake of speed I just used Chakra.

There was only one page so I had no need for React Router.

I like to abstract all my redux code into various hooks that just call the dispatch through a normal function, so the user consuming it doesn't even need to know it's using Redux.

Normally when making forms I'd use Formik or react-hook-form, but these forms were so simple/didn't make any API calls, that I just decided to reach for local state.
