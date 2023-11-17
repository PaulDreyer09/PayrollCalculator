import { Visitor } from "./visitor.js";

export class JsonLoaderVisitor extends Visitor {
  constructor() {
    super();
    this.file_promise_map = {}; // path -> [promise, json_value]
    this.pending_commands = [];
  }

  _load_json_file(path) {
    if (path in this.file_promise_map) {
      return;
    }

    try {
      const promise = fetch(path);
      this.file_promise_map[path] = {promise, json_value: null};
    } catch (error) {
      console.error("Error fetching command data", error.message);
    }
  }

  _load_pending_command(command, pending_data_reference) {
    const path = command.json_file_path;
    if (path) {
      this._load_json_file(path);

      this.pending_commands.push({
        command,
        pending_data_reference,
      });
    }
  }

  visit_set_table_command(command) {
    this._load_pending_command(command, "table_data");
  }

  visit_set_value_collection_command(command) {
    this._load_pending_command(command, "input_data");
  }

  async initialize_pending_commands() {
    const get_json_from_record = async (record) =>{
      if(record.json_value){
        return record.json_value;
      };

      try {
        const response = await record.promise;

        if (!response.ok) {
          throw new Error("The fetch response did not return Ok");
        }

        return await response.json();

      } catch (error) {
        console.error("Error while initializing pending command data:\n", error.message);
      }
    }

    for (const { command, pending_data_reference } of this.pending_commands) {
      const record = this.file_promise_map[command.json_file_path];
      const object_data = await get_json_from_record(record);
      console.log("Data loaded",  object_data);

      command[pending_data_reference] = object_data;
    }
  }
}
