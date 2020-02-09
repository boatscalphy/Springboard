describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not update server table if Server Name input is empty', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(serverNameInput.value).toEqual("");
    expect(Object.keys(allServers).length).toEqual(0);
    expect(serverTbody.rows.length).toEqual(0);
  })

  it('should create table entry with server name and earnings', function() {
    submitServerInfo();
    let serverTr = serverTbody.querySelector('tr');
    let serverName = serverTr.querySelector('td').innerText;
    expect(serverTbody.rows.length).toEqual(1);
    expect(serverName).toEqual(allServers[serverTr.id].serverName)
  })

  afterEach(function() {
    allServers = {};
    serverId = 0;
    updateServerTable();
  });
});
