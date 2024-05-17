import Accidents from '../models/Accidents.js';
import OverSpeedings from '../models/OverSpeedings.js';
import Disconnections from '../models/Disconnections.js';

const currentDate = new Date();
const dateOnly = currentDate.toISOString().split('T')[0];


export async function getStats(req, res) {
  const oneHourAgo = new Date(Date.now() - 3600).toISOString();

  try {
    const accidentStats = await Accidents.countDocuments({ date: { $lte: oneHourAgo } });
    const overspeedStats = await OverSpeedings.countDocuments({ date: { $lte: oneHourAgo } });
    const disconnectStats = await Disconnections.countDocuments({ date: { $lte: oneHourAgo } });

    res.json({
      accidents: accidentStats,
      overspeeds: overspeedStats,
      disconnects: disconnectStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//get all accident cases
export async function getAllAccidents(req, res) {
  try {
    const accidents = await Accidents.find();
    res.json(accidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//get all devices with overspeeding cases
export async function getAllOverspeeds(req, res) {
  try {
    const overspeeds = await OverSpeedings.find();
    res.json(overspeeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//getall disconnected devices
export async function getAllDisconnected(req, res) {
  try {
    const disconnected = await Disconnections.find();
    res.json(disconnected);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//add an accident 
export async function addAccident(req, res) {
  const { plate_no, location } = req.body;

  if (!plate_no || !location) {
    return res.status(400).json({ message: 'Plate number and location are required' });
  }
  const accident = new Accidents({
    plate_no,
    location,
    time: currentDate.toLocaleTimeString(),
    date: dateOnly
  });

  try {
    const newAccident = await accident.save();
    res.status(201).json(newAccident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


//add an overspeed case
export async function addOverspeeding(req, res) {
  const { plate_no, location} = req.body;

  if (!plate_no || !location ) {
    return res.status(400).json({ message: 'Plate number and location are required' });
  }

  const overspeed = new OverSpeedings({
    plate_no,
    location,
    time: currentDate.toLocaleTimeString(),
    date: dateOnly
  });

  try {
    const newOverspeed = await overspeed.save();
    res.status(201).json(newOverspeed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//adding disconnected devices to the database
export async function addDisconnected(req, res) {
  const { plate_no, location } = req.body;

  if (!plate_no || !location ) {
    return res.status(400).json({ message: 'Plate number and date are required' });
  }

  const disconnect = new Disconnections({
    plate_no,
    location,
    time: new Date().toLocaleTimeString(),
    date:dateOnly
  });

  try {
    const newDisconnect = await disconnect.save();
    res.status(201).json(newDisconnect);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
