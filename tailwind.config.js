// Defaults: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    minWidth: {
      "20": "5rem"
    },
    maxWidth: {
      "0": "0",
      "64": "16rem"
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    scale: ["responsive", "hover", "focus", "active"]
  }
};
