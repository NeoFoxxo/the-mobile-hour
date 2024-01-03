function fetchMock(response) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    })
  );
}

function fetchMockFail() {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Test error'))
  );
}

module.exports = { fetchMock, fetchMockFail };