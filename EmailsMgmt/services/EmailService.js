'use strict';

import EventBusService from '../../services/EventBusService.js'



var myEmail = 'ben123tu@gmail.com'

function getNextId() {
    var maxId = emails.reduce((acc, email) => {
        return (email.id > acc) ? email.id : acc
    }, 0);
    return maxId + 1;
}

function getNewDate() {
    var result = '';
    var d = new Date();
    result += d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() +
        ' ' + d.getHours() + ':' + d.getMinutes() + ':' +
        d.getSeconds();
    return result;
}

function getMyMail() {
    return myEmail
}

function getEmptyEmail() {
    return {
        id: null,
        title: '',
        txt: '',
        to: '',
        from: '',
        date: '',
        isRead: true,
    }
}



function getEmails() {
    return new Promise((resolve, reject) => {
        if (emails) {
            resolve(emails)
        }
        else {
            return reject()
        }
    })
}

function deleteEmail(emailId) {
    return new Promise((resolve, reject) => {
        var emailIdx = emails.findIndex(email => email.id === emailId)
            emails.splice(emailIdx, 1)
            resolve('sucsess')
    })
}

function getEmailById(emailId) {
    return new Promise((resolve, reject) => {
        var email = emails.find(email => email.id === +emailId)
        if (email) {
            email.isRead = true
            getUnreadCount()
            resolve(email)
        } else {
            reject()
        }
    })
}


function sendMail(email) {
    return new Promise((resolve, reject) => {
        emails.push(email)
        resolve()
    }) 
}

function searchEmails(arr, input) {
    var sortEmails = arr.filter(email => {
        return email.txt.toLowerCase().includes(input.toLowerCase())
    })
    return sortEmails
}

function getEmailsByCatagory(catagory) {
    switch (catagory) {
        case 'inbox':
            return emails.filter(email => {
                return email.from !== myEmail
            })
            break;
        case 'sent':
            return emails.filter(email => {
                return email.from === myEmail
            })
            break;
        case 'all':
            return emails
            break;
    }
}

function getUnreadCount() {
    var count = 0
    emails.map(email => {
        if (!email.isRead){
            count++
        }
    })
    EventBusService.$emit('EmailCountUpdate', count)
}



export default {
    getEmails,
    getEmailById,
    deleteEmail,
    searchEmails,
    sendMail,
    getEmptyEmail,
    getMyMail,
    getNewDate,
    getEmailsByCatagory,
    getUnreadCount,
    getNextId
}




var emails = [
    {
        id: 1,
        title: 'ok',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'ben123tu@gmail.com',
        to: 'shemtov@gmail.com',
        date: '7/12/2015 11:40:24',
        isRead: true,
        isMine: true
    },
    {
        id: 2,
        title: 'more then ok',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'shemtov@gmail.com',
        to: 'ben123tu@gmail.com',
        date: '4/12/2016 16:24:24',
        isRead: false,
        isMine: false
    },
    {
        id: 3,
        title: 'can get better',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'wtf@gmail.com',
        to: 'ben123tu@gmail.com',
        date: '7/08/2014 13:24:24',
        isRead: true,
        isMine: false,
    },
    {
        id: 4,
        title: 'ok',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'ben123tu@gmail.com',
        to: 'shemtov@gmail.com',
        date: '7/12/2015 11:40:24',
        isRead: true,
        isMine: true
    },
    {
        id: 5,
        title: 'more then ok',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'shemtov@gmail.com',
        to: 'ben123tu@gmail.com',
        date: '4/12/2016 16:24:24',
        isRead: false,
        isMine: false
    },
    {
        id: 6,
        title: 'can get better',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'wtf@gmail.com',
        to: 'ben123tu@gmail.com',
        date: '7/08/2014 13:24:24',
        isRead: false,
        isMine: false,
    },
    {
        id: 7,
        title: 'ok',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'ben123tu@gmail.com',
        to: 'shemtov@gmail.com',
        date: '7/12/2015 11:40:24',
        isRead: true,
        isMine: true
    },
    {
        id: 8,
        title: 'more then ok',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'shemtov@gmail.com',
        to: 'ben123tu@gmail.com',
        date: '4/12/2016 16:24:24',
        isRead: false,
        isMine: false
    },
    {
        id: 9,
        title: 'can get better',
        txt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.',
        from: 'wtf@gmail.com',
        to: 'ben123tu@gmail.com',
        date: '7/08/2014 13:24:24',
        isRead: false,
        isMine: false,
    },
]