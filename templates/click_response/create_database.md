Run the following SQL command to create the database for this template:

	CREATE TABLE `click_response` (
	 `ID` int(99) NOT NULL AUTO_INCREMENT,
	 `server_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	 `paradigm` varchar(99) NOT NULL,
	 `experiment_start_time` varchar(99) NOT NULL,
	 `subject_nr` int(99) NOT NULL,
	 `trial_number` int(99) NOT NULL,
	 `stimuli_number` int(99) NOT NULL,
	 `probe` varchar(99) NOT NULL,
	 `code` varchar(99) NOT NULL,
	 `response` varchar(99) NOT NULL,
	 `rt` int(99) NOT NULL,
	 PRIMARY KEY (`ID`)
	) ENGINE=InnoDB AUTO_INCREMENT=507 DEFAULT CHARSET=latin1

