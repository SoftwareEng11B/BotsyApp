'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Matching = mongoose.model('Matching'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  matching;

/**
 * Matching routes tests
 */
describe('Matching CRUD tests', function () {

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

    // Save a user to the test db and create new Matching
    user.save(function () {
      matching = {
        name: 'Matching name'
      };

      done();
    });
  });

  it('should be able to save a Matching if logged in', function (done) {
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

        // Save a new Matching
        agent.post('/api/matchings')
          .send(matching)
          .expect(200)
          .end(function (matchingSaveErr, matchingSaveRes) {
            // Handle Matching save error
            if (matchingSaveErr) {
              return done(matchingSaveErr);
            }

            // Get a list of Matchings
            agent.get('/api/matchings')
              .end(function (matchingsGetErr, matchingsGetRes) {
                // Handle Matchings save error
                if (matchingsGetErr) {
                  return done(matchingsGetErr);
                }

                // Get Matchings list
                var matchings = matchingsGetRes.body;

                // Set assertions
                (matchings[0].user._id).should.equal(userId);
                (matchings[0].name).should.match('Matching name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Matching if not logged in', function (done) {
    agent.post('/api/matchings')
      .send(matching)
      .expect(403)
      .end(function (matchingSaveErr, matchingSaveRes) {
        // Call the assertion callback
        done(matchingSaveErr);
      });
  });

  it('should not be able to save an Matching if no name is provided', function (done) {
    // Invalidate name field
    matching.name = '';

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

        // Save a new Matching
        agent.post('/api/matchings')
          .send(matching)
          .expect(400)
          .end(function (matchingSaveErr, matchingSaveRes) {
            // Set message assertion
            (matchingSaveRes.body.message).should.match('Please fill Matching name');

            // Handle Matching save error
            done(matchingSaveErr);
          });
      });
  });

  it('should be able to update an Matching if signed in', function (done) {
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

        // Save a new Matching
        agent.post('/api/matchings')
          .send(matching)
          .expect(200)
          .end(function (matchingSaveErr, matchingSaveRes) {
            // Handle Matching save error
            if (matchingSaveErr) {
              return done(matchingSaveErr);
            }

            // Update Matching name
            matching.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Matching
            agent.put('/api/matchings/' + matchingSaveRes.body._id)
              .send(matching)
              .expect(200)
              .end(function (matchingUpdateErr, matchingUpdateRes) {
                // Handle Matching update error
                if (matchingUpdateErr) {
                  return done(matchingUpdateErr);
                }

                // Set assertions
                (matchingUpdateRes.body._id).should.equal(matchingSaveRes.body._id);
                (matchingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Matchings if not signed in', function (done) {
    // Create new Matching model instance
    var matchingObj = new Matching(matching);

    // Save the matching
    matchingObj.save(function () {
      // Request Matchings
      request(app).get('/api/matchings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Matching if not signed in', function (done) {
    // Create new Matching model instance
    var matchingObj = new Matching(matching);

    // Save the Matching
    matchingObj.save(function () {
      request(app).get('/api/matchings/' + matchingObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', matching.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Matching with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/matchings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Matching is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Matching which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Matching
    request(app).get('/api/matchings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Matching with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Matching if signed in', function (done) {
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

        // Save a new Matching
        agent.post('/api/matchings')
          .send(matching)
          .expect(200)
          .end(function (matchingSaveErr, matchingSaveRes) {
            // Handle Matching save error
            if (matchingSaveErr) {
              return done(matchingSaveErr);
            }

            // Delete an existing Matching
            agent.delete('/api/matchings/' + matchingSaveRes.body._id)
              .send(matching)
              .expect(200)
              .end(function (matchingDeleteErr, matchingDeleteRes) {
                // Handle matching error error
                if (matchingDeleteErr) {
                  return done(matchingDeleteErr);
                }

                // Set assertions
                (matchingDeleteRes.body._id).should.equal(matchingSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Matching if not signed in', function (done) {
    // Set Matching user
    matching.user = user;

    // Create new Matching model instance
    var matchingObj = new Matching(matching);

    // Save the Matching
    matchingObj.save(function () {
      // Try deleting Matching
      request(app).delete('/api/matchings/' + matchingObj._id)
        .expect(403)
        .end(function (matchingDeleteErr, matchingDeleteRes) {
          // Set message assertion
          (matchingDeleteRes.body.message).should.match('User is not authorized');

          // Handle Matching error error
          done(matchingDeleteErr);
        });

    });
  });

  it('should be able to get a single Matching that has an orphaned user reference', function (done) {
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

          // Save a new Matching
          agent.post('/api/matchings')
            .send(matching)
            .expect(200)
            .end(function (matchingSaveErr, matchingSaveRes) {
              // Handle Matching save error
              if (matchingSaveErr) {
                return done(matchingSaveErr);
              }

              // Set assertions on new Matching
              (matchingSaveRes.body.name).should.equal(matching.name);
              should.exist(matchingSaveRes.body.user);
              should.equal(matchingSaveRes.body.user._id, orphanId);

              // force the Matching to have an orphaned user reference
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

                    // Get the Matching
                    agent.get('/api/matchings/' + matchingSaveRes.body._id)
                      .expect(200)
                      .end(function (matchingInfoErr, matchingInfoRes) {
                        // Handle Matching error
                        if (matchingInfoErr) {
                          return done(matchingInfoErr);
                        }

                        // Set assertions
                        (matchingInfoRes.body._id).should.equal(matchingSaveRes.body._id);
                        (matchingInfoRes.body.name).should.equal(matching.name);
                        should.equal(matchingInfoRes.body.user, undefined);

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
      Matching.remove().exec(done);
    });
  });
});
