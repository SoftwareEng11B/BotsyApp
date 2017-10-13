'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Arti = mongoose.model('Arti'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  arti;

/**
 * Arti routes tests
 */
describe('Arti CRUD tests', function () {

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

    // Save a user to the test db and create new Arti
    user.save(function () {
      arti = {
        name: 'Arti name'
      };

      done();
    });
  });

  it('should be able to save a Arti if logged in', function (done) {
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

        // Save a new Arti
        agent.post('/api/artis')
          .send(arti)
          .expect(200)
          .end(function (artiSaveErr, artiSaveRes) {
            // Handle Arti save error
            if (artiSaveErr) {
              return done(artiSaveErr);
            }

            // Get a list of Artis
            agent.get('/api/artis')
              .end(function (artisGetErr, artisGetRes) {
                // Handle Artis save error
                if (artisGetErr) {
                  return done(artisGetErr);
                }

                // Get Artis list
                var artis = artisGetRes.body;

                // Set assertions
                (artis[0].user._id).should.equal(userId);
                (artis[0].name).should.match('Arti name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Arti if not logged in', function (done) {
    agent.post('/api/artis')
      .send(arti)
      .expect(403)
      .end(function (artiSaveErr, artiSaveRes) {
        // Call the assertion callback
        done(artiSaveErr);
      });
  });

  it('should not be able to save an Arti if no name is provided', function (done) {
    // Invalidate name field
    arti.name = '';

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

        // Save a new Arti
        agent.post('/api/artis')
          .send(arti)
          .expect(400)
          .end(function (artiSaveErr, artiSaveRes) {
            // Set message assertion
            (artiSaveRes.body.message).should.match('Please fill Arti name');

            // Handle Arti save error
            done(artiSaveErr);
          });
      });
  });

  it('should be able to update an Arti if signed in', function (done) {
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

        // Save a new Arti
        agent.post('/api/artis')
          .send(arti)
          .expect(200)
          .end(function (artiSaveErr, artiSaveRes) {
            // Handle Arti save error
            if (artiSaveErr) {
              return done(artiSaveErr);
            }

            // Update Arti name
            arti.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Arti
            agent.put('/api/artis/' + artiSaveRes.body._id)
              .send(arti)
              .expect(200)
              .end(function (artiUpdateErr, artiUpdateRes) {
                // Handle Arti update error
                if (artiUpdateErr) {
                  return done(artiUpdateErr);
                }

                // Set assertions
                (artiUpdateRes.body._id).should.equal(artiSaveRes.body._id);
                (artiUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Artis if not signed in', function (done) {
    // Create new Arti model instance
    var artiObj = new Arti(arti);

    // Save the arti
    artiObj.save(function () {
      // Request Artis
      request(app).get('/api/artis')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Arti if not signed in', function (done) {
    // Create new Arti model instance
    var artiObj = new Arti(arti);

    // Save the Arti
    artiObj.save(function () {
      request(app).get('/api/artis/' + artiObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', arti.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Arti with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/artis/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Arti is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Arti which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Arti
    request(app).get('/api/artis/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Arti with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Arti if signed in', function (done) {
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

        // Save a new Arti
        agent.post('/api/artis')
          .send(arti)
          .expect(200)
          .end(function (artiSaveErr, artiSaveRes) {
            // Handle Arti save error
            if (artiSaveErr) {
              return done(artiSaveErr);
            }

            // Delete an existing Arti
            agent.delete('/api/artis/' + artiSaveRes.body._id)
              .send(arti)
              .expect(200)
              .end(function (artiDeleteErr, artiDeleteRes) {
                // Handle arti error error
                if (artiDeleteErr) {
                  return done(artiDeleteErr);
                }

                // Set assertions
                (artiDeleteRes.body._id).should.equal(artiSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Arti if not signed in', function (done) {
    // Set Arti user
    arti.user = user;

    // Create new Arti model instance
    var artiObj = new Arti(arti);

    // Save the Arti
    artiObj.save(function () {
      // Try deleting Arti
      request(app).delete('/api/artis/' + artiObj._id)
        .expect(403)
        .end(function (artiDeleteErr, artiDeleteRes) {
          // Set message assertion
          (artiDeleteRes.body.message).should.match('User is not authorized');

          // Handle Arti error error
          done(artiDeleteErr);
        });

    });
  });

  it('should be able to get a single Arti that has an orphaned user reference', function (done) {
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

          // Save a new Arti
          agent.post('/api/artis')
            .send(arti)
            .expect(200)
            .end(function (artiSaveErr, artiSaveRes) {
              // Handle Arti save error
              if (artiSaveErr) {
                return done(artiSaveErr);
              }

              // Set assertions on new Arti
              (artiSaveRes.body.name).should.equal(arti.name);
              should.exist(artiSaveRes.body.user);
              should.equal(artiSaveRes.body.user._id, orphanId);

              // force the Arti to have an orphaned user reference
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

                    // Get the Arti
                    agent.get('/api/artis/' + artiSaveRes.body._id)
                      .expect(200)
                      .end(function (artiInfoErr, artiInfoRes) {
                        // Handle Arti error
                        if (artiInfoErr) {
                          return done(artiInfoErr);
                        }

                        // Set assertions
                        (artiInfoRes.body._id).should.equal(artiSaveRes.body._id);
                        (artiInfoRes.body.name).should.equal(arti.name);
                        should.equal(artiInfoRes.body.user, undefined);

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
      Arti.remove().exec(done);
    });
  });
});
