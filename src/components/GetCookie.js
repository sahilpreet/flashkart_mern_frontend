function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default getCookie

//for deploayment
// add this to package.json
//   "homepage": "https://sahilpreet.github.io/flashkart_react",
// "homepage": "https://sahilpreet.github.io/flashkart_mern_frontend",
//add to scripts
// "predeploy": "npm run build",
// "deploy": "gh-pages -d build",

//install this
// npm install gh-pages --save-dev

// finally


//script in general use on laptop not for deployment
// "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
