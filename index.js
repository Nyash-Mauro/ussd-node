const UssdMenu = require('ussd-menu-builder');
// https://www.npmjs.com/package/ussd-menu-builder
exports.handler = (event, context, callback) => {
    
    const menu = new UssdMenu();
let args = {
        phoneNumber: event.phoneNumber,
        sessionId: event.sessionId,
        serviceCode: event.serviceCode,
        text: event.text
    };
// Define menu states
    let startState = {
        run: () => {
            // use menu.con() to send response without terminating session      
            menu.con('Welcome to Zero-taka-tech' + 
                '\n--------------' +
                '\n1. First Menu Option' +
                '\n0. Exit');
        },
        // next object links to next state based on user input
        next: {
            '1': 'first-option',
            '0': 'exit'
        }
    }
    
    menu.startState(startState);
    menu.state('start', startState);
    
    menu.state('first-option', {
        run: () => {
            // use menu.con() to send response without terminating session      
            menu.con('This is the first option' + 
                '\n--------------' +
                '\n9. Back' +
                '\n0. Exit');
        },
        // next object links to next state based on user input
        next: {
            '9': 'start',
            '0': 'exit'
        }
});
    
    menu.state('exit', {
        run: () => {
            menu.end('Thank you. Goodbye.');
        }
    });
menu.run(args, resMsg => {
        console.log(resMsg)
        callback(null, resMsg);
    });
};