export default {
    showMessages: function (messageType, messageTitle, messageBody) {
        const messageStr = `
[${messageType}] ${messageTitle}

${messageBody}
        `;

        alert(messageStr);
        console.log(messageStr);
    }
}