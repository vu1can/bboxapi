const Appointments = require('./appointmentModel');
const _ = require('lodash');

exports.param = function(req, res, next, id){
  Appointments
    .findById(id)
    .populate('tutor_id tutee_id program')
    .exec()
    .then(function(appointment){
      if(!appointment){
        next("No appointment found");
      }
      else {
        req.appointment = appointment;
        next();
      }
    })
}

exports.get = function(req, res, next){
  Appointments
    .find({})
    .then(function(appointment){
      res.json(appointment);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.appointment);
}

exports.put = function(req, res, next){
  let appointment = req.appointment;
  let updatedData = req.body;
  _.merge(appointment, updatedData);
  appointment.save(function(error, saved){
    if(error){
      next(error);
    }
    else res.json(saved);
  });
}

exports.post = function(req, res, next){
  var newAppointment = req.body;
  console.log(newAppointment);
  Appointments.create(newAppointment)
    .then(function(program){
      res.json(program)
    })
}

exports.delete = function(req, res, next){
  req.appointment.remove(function(error, removed){
    if(error){
      next(error);
    }
    else{
      res.json(removed);
    }
  })
}
