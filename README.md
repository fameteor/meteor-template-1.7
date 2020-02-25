# Meteor 1.7  + Bootstrap 3 + a lot of useful modules

## Available components

## Default users and roles creation

The file `imports/startup/server/fixtures.js` initialises the default roles `["DEV","ADMIN"]` and the defaut users `admin@orange.com` (password : `adminadmin`) and `dev@orange.com` (password : `devdev`).

### navBar

### languageSelect

### autoDoc


## Installation
- `meteor create  --release 1.7 meteor-template-1.7 --full`

- bootstrap 3.3.6 : `meteor add twbs:bootstrap`

- fontawesome-free 5.12.1 : `meteor npm install --save @fortawesome/fontawesome-free`

- `meteor add stylus`

- accounts-password : `meteor add accounts-password` `meteor add ian:accounts-ui-bootstrap-3`

- user status : `meteor add mizzao:user-status`

- `meteor add peppelg:bootstrap-3-modal`

- [alanning:roles@1.2.16](https://github.com/Meteor-Community-Packages/meteor-roles/tree/v1)`meteor add alanning:roles`

- `meteor npm install --save simpl-schema`

- `meteor add aldeed:autoform@6.0.0`

- `meteor add tap:i18n`

- `meteor add zimme:active-route`

- for starting problems : `meteor npm install --save-exact @babel/runtime@7.0.0-beta.55`

- and `meteor add stylus@=2.513.14`

- `meteor add chrismbeckett:toastr`

- `meteor add aldeed:collection2@3.0.0`


## Bugs

- 


## Improvement

- Add Github version management

- fork `tap:i18n` to make use of NPM simpl-schema

- add `bcrypt`

- `stylus` deprecated

- Ajouter un usefull helpers mis à jour !

- Add a linter

- Modify waiting template to be able to wait for multiple reasons, with multiple waiting messages (server ofline, data loading..)


## Upgrades : to do

- Allaning role 3 : change the default users and default roles creation code (depending on mongo version).