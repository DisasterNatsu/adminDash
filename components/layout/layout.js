import Sidebar from "../sidebar";

import React from "react";

const Layout = ({ children }) => {
	return (
		<div style={{ width: "100%" }}>
			<Sidebar />
			<div className="main">{children}</div>
		</div>
	);
};

export default Layout;
