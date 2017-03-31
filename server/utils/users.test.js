const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'NodeJS'
        }, {
            id: '2',
            name: 'Jane',
            room: 'NodeJS'
        }, {
            id: '3',
            name: 'John',
            room: 'ReactJS'
        }];
    });

    it('Should Add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Maged',
            room: 'The Office Fans'
        };
        var user2 = {
            id: '12322',
            name: 'Magedxx',
            room: 'The Office Fzzzans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        var resUser2 = users.addUser(user2.id, user2.name, user2.room);

        expect(users.users).toEqual([user, user2]);
    });

    it('Should Remove a User', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    
    it('Should not Remove User', () => {
        var userId = '55';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    
    it('Should Find User', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });
    
    it('Should not Find User', () => {
        var userId = '55';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });


    it('Should return Names for NodeJS', () => {
        var userList = users.getUserList('NodeJS');

        expect(userList).toEqual(['Mike', 'Jane']);
    });

    it('Should return Names for ReactJS', () => {
        var userList = users.getUserList('ReactJS');

        expect(userList).toEqual(['John']);
    });
});