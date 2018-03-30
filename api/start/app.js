
const path = require('path');

/**
 * Returns the path to the local provider specified by name
 *
 * @param {String} name : String : The name of the provider
 * @returns {*|string} : The path of the provider
 */
const localProvider = name => path.join(__dirname, '..', `providers/${name}`);

/*
 |--------------------------------------------------------------------------
 | Providers
 |--------------------------------------------------------------------------
 |
 | Providers are building blocks for your Adonis app. Anytime you install
 | a new Adonis specific package, chances are you will register the
 | provider here.
 |
 */
const providers = [
    '@adonisjs/framework/providers/AppProvider',
    '@adonisjs/auth/providers/AuthProvider',
    '@adonisjs/bodyparser/providers/BodyParserProvider',
    '@adonisjs/cors/providers/CorsProvider',
    '@adonisjs/lucid/providers/LucidProvider',
    localProvider('RequestProvider'),
];

/*
 |--------------------------------------------------------------------------
 | Ace Providers
 |--------------------------------------------------------------------------
 |
 | Ace providers are required only when running ace commands. For example
 | Providers for migrations, tests etc.
 |
 */
const aceProviders = [
    '@adonisjs/lucid/providers/MigrationsProvider',
    '@adonisjs/vow/providers/VowProvider',
];

/*
 |--------------------------------------------------------------------------
 | Aliases
 |--------------------------------------------------------------------------
 |
 | Aliases are short unique names for IoC container bindings. You are free
 | to create your own aliases.
 |
 | For example:
 |   { Route: 'Adonis/Src/Route' }
 |
 */
const aliases = {};

/*
 |--------------------------------------------------------------------------
 | Commands
 |--------------------------------------------------------------------------
 |
 | Here you store ace commands for your package
 |
 */
const commands = [];

module.exports = {
    providers,
    aceProviders,
    aliases,
    commands,
};
