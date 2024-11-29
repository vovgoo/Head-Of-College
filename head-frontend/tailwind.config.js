module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      inset: {
        "custom" : "34px",
      },
      height : {
        "table-gran" : "calc(100% - 5px)",
      },
      fontSize: {
        "mnogo" : "350px",
        "malo" : "150px",
      },
      borderWidth: {
        "1px" : "1px",
      },
      spacing: {
        'custom-translate': '500px', 
      },
      width : {
        "45" : "48%",
        "30" : "30%",
        "first-column" : "30px",
        "table-gran" : "2px",
      },
      colors: {
        "burger-menu" : "#fafafa",
        "border" : "#eeeeee"
      },
      boxShadow: {
        "personal" : "0px 0px 5px rgba(0,0,0,0.3)",
        "cards" : "0px 0px 5px rgba(100,100,100,0.5)",
        "note" : "5px 5px 0px rgba(0,0,0,0.5)",
        "beautiful" : "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
      },
      zIndex: {
        "max" : "99999999",
      }
    },
  },
  plugins: [],
}