const { Schema, model } = require("mongoose");

const ProjectSchema = Schema({
  uid: {
    type: String,
  },
  projectname: {
    type: String,
  },
  expect: {
    type: String,
  },
  whowantto: {
    type: String,
  },
  our: {
    type: String,
  },
  helps: {
    type: String,
  },
  unlike: {
    type: String,
  },
});

module.exports = model("Project", ProjectSchema);
