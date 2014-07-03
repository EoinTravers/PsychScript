<?php

/* This is a PHP script.
 * It's job is to sit on your server, and wait for data to be sent
 * from your participants' browsers.
 * On receiving this data, it will parse it into variables, connect to
 * your database, and store these variables in the appropriate columns
 * in the database.
 * Your database should already be set up to add some additional info,
 * specifically a timestamp, and a unique ID for each trial logged.
 * 
 * Please see the PsychScript documentation for more details.
 */

//Parse variables from JavaScript as PHP variable.
// PHP variable names are preceded with a '$', and '$_POST'
// is a universal method for transmitting data online.

/* These are the exact same variables as defined in `variables_to_log`
 * in your javascript file.
 * POST takes the `name` attribute of the HTML form, which was automatically
 * generate as `variablenameOut`.
 * 
 * Python snippet for generating this code:
 * 
 *  variables_to_log = ['paradigm', 'experiment_start_time', ..., 'rt']
 *  for v in variables_to_log:
 *      print print "$%s = $_POST['%sOut'];" % (v, v)
 * 
*/

$paradigm = $_POST['paradigmOut'];
$experiment_start_time = $_POST['experiment_start_timeOut'];
$subject_nr = $_POST['subject_nrOut'];
$trial_number = $_POST['trial_numberOut'];
$stimuli_number = $_POST['stimuli_numberOut'];
$probe = $_POST['probeOut'];
$code = $_POST['codeOut'];
$response = $_POST['responseOut'];
$rt = $_POST['rtOut'];


//Connect to database
// See documentation for details.
$host = "localhost";
$database = "your_database_name"; 
$username = "your_username";
$password = "YOUR_PASSWORD";
    
$con = mysql_connect($host, $username, $password);
mysql_select_db($database, $con) or die( "Unable to select database");

//Insert variables into database
// `click_response` is the name of the table we've created for this experiment.
// It makes good sense to use EXACTLY the same names for the variables in each place
// (javascript, this script, and the database).

/*
The following Python snippet will generate the code below.
* 
* q = 'mysql_query("INSERT INTO click_response ('
* for v in variables_to_log[:-1]:
*     q += "%s, " % v
* q += variables_to_log[-1]+')\nVALUES ('
* for v in variables_to_log[:-1]:
*     q += "'$%s', " % v
* q += variables_to_log[-1]+'\');");'
* print q
* 
*/
mysql_query("INSERT INTO click_response (paradigm, experiment_start_time, subject_nr, trial_number, stimuli_number, probe, code, response, rt)
VALUES ('$paradigm', '$experiment_start_time', '$subject_nr', '$trial_number', '$stimuli_number', '$probe', '$code', '$response', rt');");

//Disconnect
mysql_close($con);

?>
