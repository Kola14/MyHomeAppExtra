const { Pool, Client } = require('pg');

var express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const pool = new Pool({
	user: 'nikolay',
	host: 'localhost',
	database: 'myhomeappdb',
	password: '',
	port: '5432'
});

exports.NewSignal = function(req, res) {
	const deviceID = req.params.deviceID;
	pool.query("INSERT INTO EventHistory(device_id, date, time) VALUES ($1, to_char(current_timestamp, 'DD.MM.YYYY'), to_char(current_timestamp, 'HH24:MI'));", [deviceID], (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};
exports.GetEventHistory = function(req, res){
	const userID = req.params.userID;
	pool.query("SELECT eh.id, eh.device_id, date, time, usrs.device_name, isConfirmed, image FROM EventHistory as eh, Users as usrs WHERE eh.device_id = usrs.device_id AND usrs.user_id = $1 ORDER BY eh.id DESC", [userID], (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};
exports.GetRecent = function(req, res){
	const userID = req.params.userID;
	pool.query("SELECT eh.id, eh.device_id, date, time, usrs.device_name, isConfirmed, image FROM EventHistory as eh, Users as usrs WHERE eh.device_id = usrs.device_id AND usrs.user_id = $1 AND date = to_char(current_timestamp, 'DD.MM.YYYY') ORDER BY eh.id DESC;", [userID], (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};
exports.ConfirmSignal = function(req, res){
	let signalID = req.query.signalId;
	pool.query("UPDATE EventHistory SET isConfirmed = 'true' WHERE id = $1", [signalID], (err, result) => {
		if (err){
			console.log(err);
		}
		console.log(result);
		res.send(result);
	});
};

exports.GetHistory = function(req, res){
	pool.query("SELECT * FROM eventhistory ORDER BY id DESC;", (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};

exports.GetDevices = function(req, res){
	const userID = req.params.userID;
	pool.query("SELECT device_id, device_name FROM users WHERE user_id = $1;", [userID], (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};

exports.ClearHistory = function(req, res){
	const userID = req.params.userID;
	pool.query("SELECT device_id, device_name FROM users WHERE user_id = $1;", [userID], (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};

exports.GetImage = function(req, res){
	const image = req.params.image;
	res.sendFile(path.join(__dirname, '../public/uploads/'+image));
};

exports.NewSignalwImage = function(req, res){
	console.log(req.file);
	console.log(req.body);

	let deviceID = req.query.deviceID;
	const image = req.file.originalname;

	console.log(image);

	pool.query("INSERT INTO EventHistory(device_id, date, time, image) VALUES ($1, to_char(current_timestamp, 'DD.MM.YYYY'), to_char(current_timestamp, 'HH24:MI'), $2);", [deviceID, image], (err, result) => {
		if (err){
			console.log(err);
		}
		res.send(result);
	});
};
