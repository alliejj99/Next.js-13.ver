migrate((db) => {
  const collection = new Collection({
    "id": "voa0oyf0lds61ij",
    "created": "2023-03-30 10:13:01.269Z",
    "updated": "2023-03-30 10:13:01.269Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kzsddhtu",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("voa0oyf0lds61ij");

  return dao.deleteCollection(collection);
})
