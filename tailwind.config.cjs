const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: ["lofi", "dark", "cupcake", "luxury"],
  },
};

module.exports = config;