const mongoose = require('mongoose');
const Route = require('./models/Route');
const Bus = require('./models/Bus');
const Schedule = require('./models/Schedule');
require('dotenv').config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Schedule.deleteMany({});
    await Bus.deleteMany({});
    await Route.deleteMany({});
    console.log('Cleared existing data');

    const toUni = await Route.create({
      routeName: 'Vavuniya Town to University',
      direction: 'toUniversity',
      stops: [
        'Vavuniya New Bus Stand',
        'Kurumankadu',
        'Paddanichoor',
        'Veppankulam',
        'Nelukkulam',
        'Pampaimadu Junction',
        'University of Vavuniya',
      ],
      description: 'Morning route from Vavuniya town to University of Vavuniya',
    });

    const fromUni = await Route.create({
      routeName: 'Mannar Side to Vavuniya Town via University',
      direction: 'fromUniversity',
      stops: [
        'Mannar',
        'Chekkadipulavu',
        'Poovarasankulam',
        'Salambaikulam',
        'University of Vavuniya',
        'Pampaimadu Junction',
        'Nelukkulam',
        'Veppankulam',
        'Paddanichoor',
        'Kurumankadu',
        'Vavuniya New Bus Stand',
      ],
      description: 'Evening route from Mannar side passing university to Vavuniya town',
    });

    console.log('Routes created');

    const morningBuses = await Bus.insertMany([
      { busName: 'Vavuniya - Mannar (6:15)', origin: 'Vavuniya', destination: 'Mannar', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Poovarasankulam (6:40)', origin: 'Vavuniya', destination: 'Poovarasankulam', type: 'government', route: toUni._id },
      { busName: 'Vavuniya - Veppankulam (7:00)', origin: 'Vavuniya', destination: 'Veppankulam', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Cheddikulam (7:15)', origin: 'Vavuniya', destination: 'Cheddikulam', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Mannar (7:30)', origin: 'Vavuniya', destination: 'Mannar', type: 'government', route: toUni._id },
      { busName: 'Vavuniya - Veerapuram (7:45)', origin: 'Vavuniya', destination: 'Veerapuram', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Mannar (8:00)', origin: 'Vavuniya', destination: 'Mannar', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Cheddikulam (8:20)', origin: 'Vavuniya', destination: 'Cheddikulam', type: 'government', route: toUni._id },
      { busName: 'Vavuniya - Mannar (8:45)', origin: 'Vavuniya', destination: 'Mannar', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Poovarasankulam (9:30)', origin: 'Vavuniya', destination: 'Poovarasankulam', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Mannar (10:30)', origin: 'Vavuniya', destination: 'Mannar', type: 'government', route: toUni._id },
      { busName: 'Vavuniya - Cheddikulam (12:00)', origin: 'Vavuniya', destination: 'Cheddikulam', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Mannar (1:30)', origin: 'Vavuniya', destination: 'Mannar', type: 'government', route: toUni._id },
      { busName: 'Vavuniya - Veppankulam (2:30)', origin: 'Vavuniya', destination: 'Veppankulam', type: 'private', route: toUni._id },
      { busName: 'Vavuniya - Mannar (3:15)', origin: 'Vavuniya', destination: 'Mannar', type: 'private', route: toUni._id },
    ]);

    const eveningBuses = await Bus.insertMany([
      { busName: 'Mannar - Vavuniya (2:30)', origin: 'Mannar', destination: 'Vavuniya', type: 'private', route: fromUni._id },
      { busName: 'Poovarasankulam - Vavuniya (2:50)', origin: 'Poovarasankulam', destination: 'Vavuniya', type: 'government', route: fromUni._id },
      { busName: 'Cheddikulam - Vavuniya (3:15)', origin: 'Cheddikulam', destination: 'Vavuniya', type: 'private', route: fromUni._id },
      { busName: 'Mannar - Vavuniya (3:30)', origin: 'Mannar', destination: 'Vavuniya', type: 'government', route: fromUni._id },
      { busName: 'Suntharapuram - Vavuniya (3:50)', origin: 'Suntharapuram', destination: 'Vavuniya', type: 'private', route: fromUni._id },
      { busName: 'Mannar - Vavuniya (4:00)', origin: 'Mannar', destination: 'Vavuniya', type: 'private', route: fromUni._id },
      { busName: 'Cheddikulam - Vavuniya (4:20)', origin: 'Cheddikulam', destination: 'Vavuniya', type: 'government', route: fromUni._id },
      { busName: 'Mannar - Vavuniya (4:45)', origin: 'Mannar', destination: 'Vavuniya', type: 'private', route: fromUni._id },
    ]);

    console.log('Buses created');

    await Schedule.insertMany([
      { bus: morningBuses[0]._id, departureTime: '06:15', stopTimes: [{ stop: 'Kurumankadu', time: '06:25' }, { stop: 'Veppankulam', time: '06:35' }, { stop: 'Nelukkulam', time: '06:40' }, { stop: 'Pampaimadu Junction', time: '06:50' }, { stop: 'University of Vavuniya', time: '06:55' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[1]._id, departureTime: '06:40', stopTimes: [{ stop: 'Kurumankadu', time: '06:50' }, { stop: 'Veppankulam', time: '07:00' }, { stop: 'Nelukkulam', time: '07:05' }, { stop: 'Pampaimadu Junction', time: '07:15' }, { stop: 'University of Vavuniya', time: '07:20' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[2]._id, departureTime: '07:00', stopTimes: [{ stop: 'Kurumankadu', time: '07:15' }, { stop: 'Veppankulam', time: '07:25' }, { stop: 'Nelukkulam', time: '07:30' }, { stop: 'Pampaimadu Junction', time: '07:40' }, { stop: 'University of Vavuniya', time: '07:45' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[3]._id, departureTime: '07:15', stopTimes: [{ stop: 'Kurumankadu', time: '07:25' }, { stop: 'Veppankulam', time: '07:35' }, { stop: 'Nelukkulam', time: '07:40' }, { stop: 'Pampaimadu Junction', time: '07:50' }, { stop: 'University of Vavuniya', time: '07:55' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[4]._id, departureTime: '07:30', stopTimes: [{ stop: 'Kurumankadu', time: '07:40' }, { stop: 'Veppankulam', time: '07:50' }, { stop: 'Nelukkulam', time: '07:55' }, { stop: 'Pampaimadu Junction', time: '08:05' }, { stop: 'University of Vavuniya', time: '08:10' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[5]._id, departureTime: '07:45', stopTimes: [{ stop: 'Kurumankadu', time: '07:55' }, { stop: 'Veppankulam', time: '08:05' }, { stop: 'Nelukkulam', time: '08:10' }, { stop: 'Pampaimadu Junction', time: '08:20' }, { stop: 'University of Vavuniya', time: '08:25' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[6]._id, departureTime: '08:00', stopTimes: [{ stop: 'Kurumankadu', time: '08:10' }, { stop: 'Veppankulam', time: '08:20' }, { stop: 'Nelukkulam', time: '08:25' }, { stop: 'Pampaimadu Junction', time: '08:35' }, { stop: 'University of Vavuniya', time: '08:40' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[7]._id, departureTime: '08:20', stopTimes: [{ stop: 'Kurumankadu', time: '08:30' }, { stop: 'Veppankulam', time: '08:40' }, { stop: 'Nelukkulam', time: '08:45' }, { stop: 'Pampaimadu Junction', time: '08:55' }, { stop: 'University of Vavuniya', time: '09:00' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[8]._id, departureTime: '08:45', stopTimes: [{ stop: 'Kurumankadu', time: '08:55' }, { stop: 'Veppankulam', time: '09:05' }, { stop: 'Nelukkulam', time: '09:10' }, { stop: 'Pampaimadu Junction', time: '09:20' }, { stop: 'University of Vavuniya', time: '09:25' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[9]._id, departureTime: '09:30', stopTimes: [{ stop: 'Kurumankadu', time: '09:40' }, { stop: 'Veppankulam', time: '09:50' }, { stop: 'Nelukkulam', time: '09:55' }, { stop: 'Pampaimadu Junction', time: '10:05' }, { stop: 'University of Vavuniya', time: '10:10' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[10]._id, departureTime: '10:30', stopTimes: [{ stop: 'Kurumankadu', time: '10:40' }, { stop: 'Veppankulam', time: '10:50' }, { stop: 'Nelukkulam', time: '10:55' }, { stop: 'Pampaimadu Junction', time: '11:05' }, { stop: 'University of Vavuniya', time: '11:10' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[11]._id, departureTime: '12:00', stopTimes: [{ stop: 'Kurumankadu', time: '12:10' }, { stop: 'Veppankulam', time: '12:20' }, { stop: 'Nelukkulam', time: '12:25' }, { stop: 'Pampaimadu Junction', time: '12:35' }, { stop: 'University of Vavuniya', time: '12:40' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[12]._id, departureTime: '13:30', stopTimes: [{ stop: 'Kurumankadu', time: '13:40' }, { stop: 'Veppankulam', time: '13:50' }, { stop: 'Nelukkulam', time: '13:55' }, { stop: 'Pampaimadu Junction', time: '14:05' }, { stop: 'University of Vavuniya', time: '14:10' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[13]._id, departureTime: '14:30', stopTimes: [{ stop: 'Kurumankadu', time: '14:40' }, { stop: 'Veppankulam', time: '14:50' }, { stop: 'Nelukkulam', time: '14:55' }, { stop: 'Pampaimadu Junction', time: '15:05' }, { stop: 'University of Vavuniya', time: '15:10' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: morningBuses[14]._id, departureTime: '15:15', stopTimes: [{ stop: 'Kurumankadu', time: '15:25' }, { stop: 'Veppankulam', time: '15:35' }, { stop: 'Nelukkulam', time: '15:40' }, { stop: 'Pampaimadu Junction', time: '15:50' }, { stop: 'University of Vavuniya', time: '15:55' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[0]._id, departureTime: '14:30', stopTimes: [{ stop: 'University of Vavuniya', time: '14:30' }, { stop: 'Pampaimadu Junction', time: '14:35' }, { stop: 'Nelukkulam', time: '14:40' }, { stop: 'Veppankulam', time: '14:45' }, { stop: 'Kurumankadu', time: '14:55' }, { stop: 'Vavuniya New Bus Stand', time: '15:00' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[1]._id, departureTime: '14:50', stopTimes: [{ stop: 'University of Vavuniya', time: '14:50' }, { stop: 'Pampaimadu Junction', time: '14:55' }, { stop: 'Nelukkulam', time: '15:00' }, { stop: 'Veppankulam', time: '15:05' }, { stop: 'Kurumankadu', time: '15:15' }, { stop: 'Vavuniya New Bus Stand', time: '15:20' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[2]._id, departureTime: '15:15', stopTimes: [{ stop: 'University of Vavuniya', time: '15:15' }, { stop: 'Pampaimadu Junction', time: '15:20' }, { stop: 'Nelukkulam', time: '15:25' }, { stop: 'Veppankulam', time: '15:30' }, { stop: 'Kurumankadu', time: '15:40' }, { stop: 'Vavuniya New Bus Stand', time: '15:45' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[3]._id, departureTime: '15:30', stopTimes: [{ stop: 'University of Vavuniya', time: '15:30' }, { stop: 'Pampaimadu Junction', time: '15:35' }, { stop: 'Nelukkulam', time: '15:40' }, { stop: 'Veppankulam', time: '15:45' }, { stop: 'Kurumankadu', time: '15:55' }, { stop: 'Vavuniya New Bus Stand', time: '16:00' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[4]._id, departureTime: '15:50', stopTimes: [{ stop: 'University of Vavuniya', time: '15:50' }, { stop: 'Pampaimadu Junction', time: '15:55' }, { stop: 'Nelukkulam', time: '16:00' }, { stop: 'Veppankulam', time: '16:05' }, { stop: 'Kurumankadu', time: '16:15' }, { stop: 'Vavuniya New Bus Stand', time: '16:20' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[5]._id, departureTime: '16:00', stopTimes: [{ stop: 'University of Vavuniya', time: '16:00' }, { stop: 'Pampaimadu Junction', time: '16:05' }, { stop: 'Nelukkulam', time: '16:10' }, { stop: 'Veppankulam', time: '16:15' }, { stop: 'Kurumankadu', time: '16:25' }, { stop: 'Vavuniya New Bus Stand', time: '16:30' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[6]._id, departureTime: '16:20', stopTimes: [{ stop: 'University of Vavuniya', time: '16:20' }, { stop: 'Pampaimadu Junction', time: '16:25' }, { stop: 'Nelukkulam', time: '16:30' }, { stop: 'Veppankulam', time: '16:35' }, { stop: 'Kurumankadu', time: '16:45' }, { stop: 'Vavuniya New Bus Stand', time: '16:50' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
      { bus: eveningBuses[7]._id, departureTime: '16:45', stopTimes: [{ stop: 'University of Vavuniya', time: '16:45' }, { stop: 'Pampaimadu Junction', time: '16:50' }, { stop: 'Nelukkulam', time: '16:55' }, { stop: 'Veppankulam', time: '17:00' }, { stop: 'Kurumankadu', time: '17:10' }, { stop: 'Vavuniya New Bus Stand', time: '17:15' }], daysOperating: ['Monday','Tuesday','Wednesday','Thursday','Friday'], status: 'on-time' },
    ]);

    console.log('Schedules created');
    console.log('Database seeded successfully with real Vavuniya bus data!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();