const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "habit-hero-f8094",
  "private_key_id": "2a6c8fa76379444f06a7bcd04804e9057225fb61",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6nd5Syg3pmlSc\nDGMtcD22HAbBr9++8vRQ1x/GyfCbcW1Ra1HqWB4xOnP9s5Qt7UdG+rvIeeKuLzrq\niOj05rbEzr2JBSjuxtKrX1RBAhGLWAVCoIzDJ/JOQR3x6J1VpI9r7KBq4h9DEwmQ\n7io1c5tTo3EMkHws7HXJuS9DJj8Ak8+1An/jfCOwlQAWZ/j+5mXk6NqB6HUnJugU\n54qKPQ6+5f7LNhHqIr+HSLfcCWb0ielT5irSPLI7eNmjmQfBeW/OgZgtAxPPNDX1\npHxviZ4mIfB10yQgOTgj3hStYvzNZpTEu2eUYHm6v+nMS4grnm3Ut6NuDVEO3GiV\n1v98bVFrAgMBAAECggEAAtXsRL4c6QGh1dSFsJvl1tMP3TiSwfWHddpW+W/PGqWQ\nv4MjIFhMw9BmESL965a76whbUHKzBD+OecrbyKuKzRcbyoMMD1jGZw6Qmq5GiE4C\n7R4VwCS8FKlTpFM1tNFGe/bWrIPEGCz9YQ46u6Db6YZFwlGduWxcZn93CDetZGZT\n8HE0Jx1pWoJLL3VQL7ywHrttmSTNpQLEPLPkF7C4MaH3SiRqM2hJGAGnhylViHt9\n8GC6l+4RQrQKp3bhVoHhew3Cma4/gc7DqT33rHe0aplPIY1+M0G2PMr0utwYlnBa\nc4gPsDnnFRwnWTLR/T5Vctm5sfcK0zQUBlz7aMpeMQKBgQDeJT66I5vRyzYI0+Hj\nEfuwPyh+tx7TKJCBDpnMM10oDmmm/WgMbc3fnOl/cPpWliYneLyPFneh+F33nHnL\nTSHE2BsC9qfgsmozhFVrilLPlXnSYM0zk8u0KIkbv/VF7d9RZT9p224umWqgC4/g\nOnHlKpNcLc1vuxgNXWcuk/pRsQKBgQDXDoHENfvgojzPpiOiDyO6+xYtoR/kR+sh\nG/NOnv0QzSahNndB5nZsEqAfOs7J+nffMhhZXkh2raBL8IikrtAQ3X0Ub1Yjdap7\nx08WcGgQ2q2V3rTauBEZmJEfBXd0J3sJpbRRoAet+IbT7Ho52z1ohrT0bNVK4J/A\nLcQ8l/Uf2wKBgFrCrNYwJkGY3QLOTsQPXN2tcEYVWyq6sA+Kf5vGgJEVEmV/szsg\nwbRSz7OZ3S3zOrN1yNRNQaOTbhD0hW5inSFnieG0FPLg8jMKJjxBz4Owdo1Vr4Eb\nKWb6CMqlqvhfL5Z532bImEPBuqaZErdyKYaP1pUawYyczD7ponaNTwCBAoGAWy9f\nfl6Vae3gcvsy6KgaslF8WeSTrSuBWwyK4a8wBku2MWzyrBKX68MJ+bPpsmJtKUoI\nYPxFJW0BJrHafllRB5WiT2PV1jsyCkG8GvuWZG8UYxOHA6ZAOeYiwlCDEdEbrj+A\ncYu1NeLG6FzAhn+bThKv72OmHJWZptbA+iBEYzkCgYEAkLdo3NJJEe+SRe4aXDH/\nxKMrMBD1E/YnCzBvt5Tir427OtLhwRTQMkE+FQcLJE1BMmcswSmqlg6iJF35+e3d\n4VQnRhTgbi2ORdmW6oTOsJ1e9wL2gfPysGPOaD+vEgm+nSySHNALV3phUxgjxFUL\naIWbmbu2R9EQT4f5eokUoBI=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@habit-hero-f8094.iam.gserviceaccount.com",
  "client_id": "103297206408393943445",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40habit-hero-f8094.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
