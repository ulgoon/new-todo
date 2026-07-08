var SHEET_NAME = 'Todos';
var HEADERS = [
  'id',
  'title',
  'status',
  'createdAt',
  'dueDate',
  'completedAt',
  'cancelledAt',
  'locationAddress',
  'locationLat',
  'locationLng',
  'updatedAt',
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function rowToTodo_(row) {
  var todo = {};
  HEADERS.forEach(function (key, i) {
    var value = row[i];
    todo[key] = value === '' || value === undefined ? null : value;
  });
  if (todo.locationLat !== null) todo.locationLat = Number(todo.locationLat);
  if (todo.locationLng !== null) todo.locationLng = Number(todo.locationLng);
  if (todo.createdAt instanceof Date) todo.createdAt = todo.createdAt.toISOString();
  if (todo.dueDate instanceof Date) todo.dueDate = todo.dueDate.toISOString();
  if (todo.completedAt instanceof Date) todo.completedAt = todo.completedAt.toISOString();
  if (todo.cancelledAt instanceof Date) todo.cancelledAt = todo.cancelledAt.toISOString();
  if (todo.updatedAt instanceof Date) todo.updatedAt = todo.updatedAt.toISOString();
  return todo;
}

function todoToRow_(todo) {
  return HEADERS.map(function (key) {
    var value = todo[key];
    return value === null || value === undefined ? '' : value;
  });
}

function findRowIndexById_(sheet, id) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0] === id) return i + 2;
  }
  return -1;
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doGet() {
  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  var rows = values.slice(1).filter(function (row) {
    return row[0] !== '';
  });
  var todos = rows.map(rowToTodo_);
  return jsonResponse_({ todos: todos });
}

function doPost(e) {
  var sheet = getSheet_();
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ ok: false, error: 'Invalid JSON' });
  }

  var action = body.action;

  if (action === 'create') {
    sheet.appendRow(todoToRow_(body.todo));
    return jsonResponse_({ ok: true });
  }

  if (action === 'update') {
    var updateRowIndex = findRowIndexById_(sheet, body.todo.id);
    if (updateRowIndex === -1) {
      return jsonResponse_({ ok: false, error: 'Not found' });
    }
    sheet
      .getRange(updateRowIndex, 1, 1, HEADERS.length)
      .setValues([todoToRow_(body.todo)]);
    return jsonResponse_({ ok: true });
  }

  if (action === 'delete') {
    var deleteRowIndex = findRowIndexById_(sheet, body.id);
    if (deleteRowIndex === -1) {
      return jsonResponse_({ ok: false, error: 'Not found' });
    }
    sheet.deleteRow(deleteRowIndex);
    return jsonResponse_({ ok: true });
  }

  return jsonResponse_({ ok: false, error: 'Unknown action: ' + action });
}
