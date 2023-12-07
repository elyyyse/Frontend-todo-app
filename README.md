# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode

### Links

- Solution URL: https://github.com/elyyyse/Frontend-todo-app
- Live Site URL: https://elyyyse.github.io/Frontend-todo-app/

## My process

### Built with

- Vanilla JavaScript
- Semantic HTML5 markup
  - Content Template element
- CSS custom properties
  - Flexbox

### What I learned

- This was my first project using the [content template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template), which I used to templatize the creation of new todos
- Learned some better practices for when to use `<img>` tags in my HTML versus when to set `background: url()` in my CSS
- Figured out how to create a [gradient border with border radius](https://codyhouse.co/nuggets/css-gradient-borders) and also created a `::before` pseudo-element for the first time
- Figured out how to fully customize radio buttons (hidden) and checkboxes (replaced with ::before pseudo-elements) while still maintaining accessibility for keyboard users
- Bonus feature: I used localStorage, so you won't lose your todos on page refresh
- **UPDATE**: Added drag and drop (from my 'continued development' goals below) using [entirely vanilla Javascript](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API). I looked into some libraries, but decided to build it from scratch to better understand how it was all working. I'm pretty proud of how it turned out.

### Continued development

- For v1 of this app, I did not finesse the transitions for creating/deleting todos, toggling day/night modes, or any of the hover states. I may take a pass at that in v2.
- ~~There was a bonus requirement in this challenge to add drag and drop. This is something I might revisit once I've learned React or a similar framework.~~ (added - see above)

## Author

- Elyse Kanagaratnam - [Website](https://www.elysekan.com) | [LinkedIn](https://www.linkedin.com/in/elysekanagaratnam)
- Frontend Mentor - [@elyyyse](https://www.frontendmentor.io/profile/elyyyse)
