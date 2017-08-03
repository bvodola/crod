import React from 'react';

const DateDisplay = ({date}) => {

	// First, we change the way the date is being displayed
	// according to the difference from now
	formattedDate = moment(date).calendar();

	return(
		<span>{formattedDate}</span>
	);
};

export default DateDisplay;