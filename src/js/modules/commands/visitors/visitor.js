export class Visitor {
  // Composite Commands
  enter_command_list(commandList) {}
  
  exit_command_list(commandList) {}

  // Set Constant Commands
  visit_set_table_command(command) {}
  
  visit_set_value_collection_command(command) {}
  
  visit_set_value_command(command) {}

  // IO Commands  
  visit_define_input_command(command) {}
  
  visit_define_output_command(command) {}
  
  // Arithmetic Commands
  visit_add_command(command) {}
  
  visit_subtract_command(command) {}
  
  visit_multiply_command(command) {}
  
  visit_divide_command(command) {}
  
  visit_annualize_command(command) {}
  
  visit_de_annualize_command(command) {}
  
  visit_lesser_of_command(command) {}
  
  visit_floored_difference_command(command) {}
  
  visit_calculate_limited_percentage_command(command) {}
  
  visit_tabled_calculation_command(command) {}
  
  visit_calculate_added_total_by_tiers_command(command) {}
  
  visit_calculate_tax_by_tiers_command(command) {}
}
