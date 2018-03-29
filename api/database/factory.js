/*
 |--------------------------------------------------------------------------
 | Factory
 |--------------------------------------------------------------------------
 |
 | Factories are used to define blueprints for database tables or Lucid
 | models. Later you can use these blueprints to seed your database
 | with dummy data.
 |
 */

const user = require('./blueprints/user');

const Factory = use('Factory');

Factory.blueprint('App/Models/User', user);
