'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Wall = mongoose.model('Wall'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  wall;

/**
 * Wall routes tests
 */
describe('Wall CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Wall
    user.save(function () {
      wall = {
        name: 'Wall name'
      };

      done();
    });
  });

  it('should be able to save a Wall if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Wall
        agent.post('/api/walls')
          .send(wall)
          .expect(200)
          .end(function (wallSaveErr, wallSaveRes) {
            // Handle Wall save error
            if (wallSaveErr) {
              return done(wallSaveErr);
            }

            // Get a list of Walls
            agent.get('/api/walls')
              .end(function (wallsGetErr, wallsGetRes) {
                // Handle Walls save error
                if (wallsGetErr) {
                  return done(wallsGetErr);
                }

                // Get Walls list
                var walls = wallsGetRes.body;

                // Set assertions
                (walls[0].user._id).should.equal(userId);
                (walls[0].name).should.match('Wall name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Wall if not logged in', function (done) {
    agent.post('/api/walls')
      .send(wall)
      .expect(403)
      .end(function (wallSaveErr, wallSaveRes) {
        // Call the assertion callback
        done(wallSaveErr);
      });
  });

  it('should not be able to save an Wall if no name is provided', function (done) {
    // Invalidate name field
    wall.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Wall
        agent.post('/api/walls')
          .send(wall)
          .expect(400)
          .end(function (wallSaveErr, wallSaveRes) {
            // Set message assertion
            (wallSaveRes.body.message).should.match('Please fill Wall name');

            // Handle Wall save error
            done(wallSaveErr);
          });
      });
  });

  it('should be able to update an Wall if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Wall
        agent.post('/api/walls')
          .send(wall)
          .expect(200)
          .end(function (wallSaveErr, wallSaveRes) {
            // Handle Wall save error
            if (wallSaveErr) {
              return done(wallSaveErr);
            }

            // Update Wall name
            wall.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Wall
            agent.put('/api/walls/' + wallSaveRes.body._id)
              .send(wall)
              .expect(200)
              .end(function (wallUpdateErr, wallUpdateRes) {
                // Handle Wall update error
                if (wallUpdateErr) {
                  return done(wallUpdateErr);
                }

                // Set assertions
                (wallUpdateRes.body._id).should.equal(wallSaveRes.body._id);
                (wallUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Walls if not signed in', function (done) {
    // Create new Wall model instance
    var wallObj = new Wall(wall);

    // Save the wall
    wallObj.save(function () {
      // Request Walls
      request(app).get('/api/walls')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Wall if not signed in', function (done) {
    // Create new Wall model instance
    var wallObj = new Wall(wall);

    // Save the Wall
    wallObj.save(function () {
      request(app).get('/api/walls/' + wallObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', wall.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Wall with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/walls/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Wall is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Wall which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Wall
    request(app).get('/api/walls/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Wall with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Wall if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Wall
        agent.post('/api/walls')
          .send(wall)
          .expect(200)
          .end(function (wallSaveErr, wallSaveRes) {
            // Handle Wall save error
            if (wallSaveErr) {
              return done(wallSaveErr);
            }

            // Delete an existing Wall
            agent.delete('/api/walls/' + wallSaveRes.body._id)
              .send(wall)
              .expect(200)
              .end(function (wallDeleteErr, wallDeleteRes) {
                // Handle wall error error
                if (wallDeleteErr) {
                  return done(wallDeleteErr);
                }

                // Set assertions
                (wallDeleteRes.body._id).should.equal(wallSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Wall if not signed in', function (done) {
    // Set Wall user
    wall.user = user;

    // Create new Wall model instance
    var wallObj = new Wall(wall);

    // Save the Wall
    wallObj.save(function () {
      // Try deleting Wall
      request(app).delete('/api/walls/' + wallObj._id)
        .expect(403)
        .end(function (wallDeleteErr, wallDeleteRes) {
          // Set message assertion
          (wallDeleteRes.body.message).should.match('User is not authorized');

          // Handle Wall error error
          done(wallDeleteErr);
        });

    });
  });

  it('should be able to get a single Wall that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Wall
          agent.post('/api/walls')
            .send(wall)
            .expect(200)
            .end(function (wallSaveErr, wallSaveRes) {
              // Handle Wall save error
              if (wallSaveErr) {
                return done(wallSaveErr);
              }

              // Set assertions on new Wall
              (wallSaveRes.body.name).should.equal(wall.name);
              should.exist(wallSaveRes.body.user);
              should.equal(wallSaveRes.body.user._id, orphanId);

              // force the Wall to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Wall
                    agent.get('/api/walls/' + wallSaveRes.body._id)
                      .expect(200)
                      .end(function (wallInfoErr, wallInfoRes) {
                        // Handle Wall error
                        if (wallInfoErr) {
                          return done(wallInfoErr);
                        }

                        // Set assertions
                        (wallInfoRes.body._id).should.equal(wallSaveRes.body._id);
                        (wallInfoRes.body.name).should.equal(wall.name);
                        should.equal(wallInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Wall.remove().exec(done);
    });
  });
});
