const mysql = require('mysql');

jest.mock('mysql');

mysql.createConnection.mockImplementation(() => ({
  connect: jest.fn(),
}));

// import after the mysql mock is made to force dbconnection to use it instead of the real mysql
const { db, connectToDatabase } = require('../../dbconnection');

describe('Connect to Database', () => {
  test('Database details are correct', () => {
    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: '127.0.0.1',
      user: 'server',
      password: 'Banshee-Pristine-Encroach0',
      database: 'the-mobile-hour',
      multipleStatements: true
    })
  });

  test('Database connection is called', () => {
    connectToDatabase();
    expect(db.connect).toHaveBeenCalled();
  });

  test('Error is thrown if the connection fails', () => {
    const mockError = new Error('Test error');
    db.connect = jest.fn((callback) => {
      callback(mockError);
    });
    expect(connectToDatabase).toThrow(mockError);
  });
})