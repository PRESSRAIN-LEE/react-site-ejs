"use strict";

//DB연결 설정
const mysqlConn = require('../../db/DbConn')();
const db = mysqlConn.init();

exports.index = (req, res) => {
	res.render("index", {pageTitle: "EJS 메인"});
};