// Load environment variables from .env file if it exists
require('dotenv').config();

const express = require('express');
const app = express();
const fireengine = require('fireenginecms');
const port = process.env.FIREENGINE_PORT || process.env.PORT || 3001;

const renderFullName = ({ name, value, label }) => [
  function render() {
    const [first, last] = (value || '').split(' ');
    return `
      <div style="width: 100%;display: flex;gap: 12px;">
        <input 
          id="${name}_first" 
          placeholder="First name"
          value="${first || ''}"
          style="flex: 1;width: 100%;font-size: 1rem;font-weight: 400;line-height: 1.4375em;color: rgba(0, 0, 0, 0.87);border: rgb(33, 33, 33) solid 1px;border-radius: 4px;padding: 16.5px 14px;"
        />
        <input 
          id="${name}_last" 
          placeholder="Last name"
          value="${last || ''}"
          style="flex: 1;width: 100%;font-size: 1rem;font-weight: 400;line-height: 1.4375em;color: rgba(0, 0, 0, 0.87);border: rgb(33, 33, 33) solid 1px;border-radius: 4px;padding: 16.5px 14px;"
        />
      </div>
    `;
  },
  function getValue() {
    const first = document.getElementById(`${name}_first`).value;
    const last = document.getElementById(`${name}_last`).value;
    return `${first} ${last}`.trim();
  },
  function cleanup() {
    // Optional cleanup
  }
]

const renderFullNameOutput = ({ name, value, label }) => {
  return function render() {
    if (!value || value.trim() === '') {
      return '<span style="color: #999; font-style: italic;">No name provided</span>';
    }
    
    const [first, last] = value.split(' ');
    const firstName = first || '';
    const lastName = last || '';
    
    return `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        ">
          ${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style="font-weight: 500; color: #333;">${value}</div>
          ${firstName && lastName ? `<div style="font-size: 12px; color: #666;">First: ${firstName}, Last: ${lastName}</div>` : ''}
        </div>
      </div>
    `;
  };
};

app.use('/', fireengine({
  adminCredentials: require('./.google_credentials.json'),
  webappConfig: require('./.webapp_config.json'),
  customFields: {
    "double_input": {
      extends: "string",
      label: "Double Input",
      renderInput: renderFullName,
      renderOutput: renderFullNameOutput,
    }
  },
  schemaOverrides: {
    "users": {
      titleTemplate: "${email}",
      download: false, // Disable CSV export for sensitive user data
      fields: [
        { name: "email", label:"E-mail", type: "string", required: true },
        { name: "role", required: true, type: "string", options: [{text: "Administrator", value: "admin"}, ["user", "Regular user"], "moderator"] },
        { name: "isActive", label: "Is active", type: "boolean", default: true },
        { name: "fullName", label: "Full Name", type: "double_input" },
        { name: "top_comment", label: "Top comment" }
      ]
    },
    "articles": {
      download: true, // Allow CSV export for articles (default behavior)
      fields: [
        { name: "body", type: "editor"},
        { name: "featured_image", type: "assets", max: 1},
        { name: "writer", type: "reference", referencePath: "users"},
        { name: "tags"},
      ]
    },
  }
}));

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });
