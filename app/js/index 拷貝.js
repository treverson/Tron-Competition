/* styling */
require('styles/main.scss');
/* js */
import $ from 'jquery';
import { log, logTitle } from 'logger';
/* your imports */
logTitle('Title');
/* coding examples */

const names = ['Anna', 'Robin', 'Betty', 'Shit', 'Bull'];

const [a, b, c, ...darr] = names;

log('darr: ${darr}');
log('a: ${a}, b: ${b}');
log('what');