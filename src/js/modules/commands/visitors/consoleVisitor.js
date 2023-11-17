import { Visitor } from "./visitor.js";

export class ConsolePrettyPrinterVisitor extends Visitor {
  constructor() {
    super();
    this.indent_level = 0;
    this.indent_character = "\t";
    this.current_indent_string = "";
    this.info_indent_string = this._create_string_indent(1);
  }

  /**
   * Creates an indented string based on the specified level.
   * @param {number} level - The level of indentation.
   * @returns {string} - The indented string.
   */
  _create_string_indent(level) {
    return this.indent_character.repeat(level);
  }

  _update_indent_values() {
    this.current_indent_string = this._create_string_indent(this.indent_level);
    this.info_indent_string = this._create_string_indent(this.indent_level + 1);
  }

  _print_object_data_to_log(obj) {
    const indent = this._create_string_indent(this.indent_level + 1);

    for (const key in obj) {
      console.log(`${indent}${key}: ${obj[key]}`);
    }
  }

  // Composite Commands

  enter_command_list(command_list) {
    console.log(`${this.current_indent_string}Start Command List: ${command_list.list_name}`);
    this.indent_level++;
    this._update_indent_values();
  }

  exit_command_list(command_list) {
    this.indent_level--;
    this._update_indent_values();
    console.log(`${this.current_indent_string}End Command List: ${command_list.list_name}`);
  }

  // Set Constant Commands

  visit_set_table_command(command) {
    console.log(`${this.current_indent_string}Setting table data. Reference: ${command.input_reference}`);
    console.table(command.table_data);
  }

  visit_set_value_collection_command(command) {
    console.log(`${this.current_indent_string}Setting collection of constants, adding a prefix of '${command.reference_prefix}'`);
    this._print_object_data_to_log(command.input_data);
  }

  visit_set_value_command(command) {
    console.log(`${this.current_indent_string}Setting constant | ${command.input_reference}: ${command.input_value}`);
  }

  // IO Commands

  visit_define_input_command(command) {
    const { reference, data_type, properties, text } = command;

    console.log(`${this.current_indent_string}Defining input for ${text}`);
    console.log(`${this.info_indent_string}Reference: ${reference}`);
    console.log(`${this.info_indent_string}Data type: ${data_type}`);

    if (properties.options) {
      console.log(`${this.info_indent_string}Selectable options:`);
      for (const option of properties.options) {
        console.log(`\t${this.info_indent_string}Text: ${option.text}, Value: ${option.value}`);
      }
    }
  }

  visit_define_output_command(command) {
    const { reference, data_type, text } = command;

    console.log(`${this.current_indent_string}Defining output for ${text}`);
    console.log(`${this.info_indent_string}Reference: ${reference}`);
    console.log(`${this.info_indent_string}Data type: ${data_type}`);
  }

  // Arithmetic Commands

  visit_add_command(command) {
    console.log(`${this.current_indent_string}Add Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input references to add together: ${command.input_references.join(", ")}`);
  }
  visit_subtract_command(command) {
    console.log(`${this.current_indent_string}Subtract Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Initial Value reference: ${command.input_references[0]}`);
    console.log(`${this.info_indent_string}Input references: ${command.input_references.slice(1).join(", ")}`);
  }

  visit_multiply_command(command) {
    console.log(`${this.current_indent_string}Multiply Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input references to multiply together: ${command.input_references.join(", ")}`);
  }

  visit_divide_command(command) {
    console.log(`${this.current_indent_string}Divide Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Initial Value reference: ${command.input_references[0]}`);
    console.log(`${this.info_indent_string}Input references: ${command.input_references.slice(1).join(", ")}`);
  }

  visit_annualize_command(command) {
    console.log(`${this.current_indent_string}Annualize Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Initial Value reference: ${command.input_value_reference}`);
    console.log(`${this.info_indent_string}Periods per annum reference: ${command.periods_per_annum_reference}`);
  }

  visit_deannualize_command(command) {
    console.log(`${this.current_indent_string}DE-Annualize Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input Value reference: ${command.input_value_reference}`);
    console.log(`${this.info_indent_string}Periods per annum reference: ${command.periods_per_annum_reference}`);
  }

  visit_lesser_of_command(command) {
    console.log(`${this.current_indent_string}Lesser-Of Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input references: ${command.input_references.join(", ")}`);
  }

  visit_floored_difference_command(command) {
    console.log(`${this.current_indent_string}Floored Difference Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Initial Value reference: ${command.input_references[0]}`);
    console.log(`${this.info_indent_string}Input references: ${command.input_references.slice(1).join(", ")}`);
  }

  visit_calculate_limited_percentage_command(command) {
    console.log(`${this.current_indent_string}Calculate Limited Percentage Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input Value reference: ${command.input_value_reference}`);
    console.log(`${this.info_indent_string}Rate references: ${command.rate_reference}`);
    console.log(`${this.info_indent_string}Ceiling references: ${command.ceiling_reference}`);
  }

  // Tabled Calculation Commands

  visit_calculate_added_total_by_tiers_command(command) {
    console.log(`${this.current_indent_string}Calculate by Added Total Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input Value reference: ${command.input_references}`);
    console.log(`${this.info_indent_string}Table reference: ${command.table_reference}`);
  }

  visit_calculate_tax_by_tiers_command(command) {
    console.log(`${this.current_indent_string}Calculate Tax by Tiers Command.`);
    console.log(`${this.info_indent_string}Result references: ${command.result_reference}`);
    console.log(`${this.info_indent_string}Input Value reference: ${command.input_value_reference}`);
    console.log(`${this.info_indent_string}Table reference: ${command.table_reference}`);
  }
}
