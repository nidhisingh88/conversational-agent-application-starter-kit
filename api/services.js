/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var watson  = require('watson-developer-cloud'),
  fs        = require('fs'),
  trim      = require('trim');
// This application requires 3 ids to work propertly

// 1. TMDB API key that can be obtained in https://www.themoviedb.org/documentation/api
var TMDB_API_KEY = process.env.TMDB_API_KEY || '';

// 2. dialog id - see training/setup.js
var DIALOG_ID = 'TYPE DIALOG ID HERE';
if (fs.existsSync(__dirname + '/training/dialog_id'))
  DIALOG_ID = trim(fs.readFileSync(__dirname + '/training/dialog_id', 'utf8'));

// 3. classifier id - see training/setup.js
var CLASSIFIER_ID = 'TYPE CLASSIFIER ID HERE';
if (fs.existsSync(__dirname + '/training/cclassifier_id'))
  CLASSIFIER_ID = trim(fs.readFileSync(__dirname + '/training/classifier_id', 'utf8'));


module.exports = {
  dialog : watson.dialog({
    username: '<username>',
    password: '<password>',
    version: 'v1',
    path: { dialog_id: DIALOG_ID }
  }),

  // if the API key for TMDB wasn't provided use the mock module to mimic the API
  movieDB: require(TMDB_API_KEY ? './moviedb' : './moviedb-mock')(TMDB_API_KEY),

  classifier: watson.natural_language_classifier({
    username: '<username>',
    password: '<password>',
    version: 'v1',
    path: { classifier_id: CLASSIFIER_ID }
  })
};
