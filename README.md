# Meteor 1.7  + Bootstrap 3 + a lot of useful modules

## Available components

## Default users and roles creation

The file `imports/startup/server/fixtures.js` initialises the default roles `["DEV","ADMIN"]` and the defaut users `admin@orange.com` (password : `adminadmin`) and `dev@orange.com` (password : `devdev`).

### navBar

### languageSelect

### autoDoc


## Installation
- `meteor create  --release 1.7 meteor-template-1.7 --full`

- [bootstrap 3.3.6](https://getbootstrap.com/docs/3.3/) : `meteor add twbs:bootstrap`

- [fontawesome-free 5.12.1](https://fontawesome.com/icons?d=gallery&m=free) : `meteor npm install --save @fortawesome/fontawesome-free`

- `meteor add stylus`

- accounts-password : `meteor add accounts-password` `meteor add ian:accounts-ui-bootstrap-3`

- [mizzao:user status](https://github.com/Meteor-Community-Packages/meteor-user-status) : `meteor add mizzao:user-status`

- [peppelg:bootstrap-3-modal](https://github.com/PeppeL-G/bootstrap-3-modal) : `meteor add peppelg:bootstrap-3-modal`

- [alanning:roles@1.2.16](https://github.com/Meteor-Community-Packages/meteor-roles/tree/v1) : `meteor add alanning:roles`

- [aldeed NPM simpl-schema](https://github.com/aldeed/simple-schema-js) `meteor npm install --save simpl-schema`

- [aldeed:autoform@6.0.0](https://github.com/aldeed/meteor-autoform) : `meteor add aldeed:autoform@6.0.0`

- [tap:i18n](https://github.com/TAPevents/tap-i18n) : `meteor add tap:i18n`

- [zimme:active-route](https://github.com/meteor-activeroute/legacy) : `meteor add zimme:active-route`

- for starting problems : `meteor npm install --save-exact @babel/runtime@7.0.0-beta.55`

- and `meteor add stylus@=2.513.14`

- [chrismbeckett:toastr](https://atmospherejs.com/chrismbeckett/toastr) : `meteor add chrismbeckett:toastr`

- [aldeed:collection2](https://github.com/Meteor-Community-Packages/meteor-collection2) : `meteor add aldeed:collection2@3.0.0`


## Bugs

- When unkwown route go to home page. (Reload thus Roles not loaded). Should be corrected when redirect after loging.


## Improvement

- Add Github version management

- User management to be added

- fork `tap:i18n` to make use of NPM simpl-schema

- add `bcrypt`

- `stylus` deprecated

- Ajouter un usefull helpers mis à jour !

- Add a linter

- Modify waiting template to be able to wait for multiple reasons, with multiple waiting messages (server ofline, data loading..)


## Upgrades : to do

- Allaning role 3 : change the default users and default roles creation code (depending on mongo version).