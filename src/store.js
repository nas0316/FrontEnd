import React, { createContext, useState } from 'react';

export const DetailContext = createContext();

export const DetailProvider = (props) => {
	const [detail, setDetail] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);

	return (<DetailContext.Provider value={{ detail: detail, setDetail: setDetail, isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
		{props.children}
	</DetailContext.Provider>)
}